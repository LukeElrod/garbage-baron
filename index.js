const Discord = require('discord.js')
const OpenAI = require("openai")

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, 
    Discord.GatewayIntentBits.GuildModeration, Discord.GatewayIntentBits.GuildMessageReactions] })

client.login(process.env.DISCORD_API_KEY);
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

async function queryGPT(message){
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: "You are a mischievous sewer rat called The Garbage Baron. Rats will come to you seeking wisdom. Respond accordingly."},
            { role: 'user', content: message.content }],
        model: 'gpt-4o'
      });
    return chatCompletion.choices[0].message.content;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async (message) => {
    //dont let the bot have a convo with itself
    if (message.author.bot) return;
    const baronRegex = /garbage|baron/i;
    if (baronRegex.test(message)) { 
        const response = await queryGPT(message);
        message.channel.send(response);
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        const ratRegex = /rat/i
        
        newMember.guild.roles.fetch("610572763668676629").then(role => {
            if (ratRegex.test(newMember.nickname) || newMember.nickname.includes('🐀') || newMember.nickname.includes('🐭') || newMember.nickname.includes('🐁')) {
                newMember.roles.add(role)
                
                const channel = newMember.guild.channels.cache.get('621976580977065995');
                channel.send(`${newMember.user.tag} is now one of us.`);
            }else{
                newMember.roles.remove(role)
                
                const channel = newMember.guild.channels.cache.get('621976580977065995');
                channel.send(`${newMember.user.tag} has forsaken their oath.`);
            }
        }).catch(error => {
            console.error("rat role not found");
        })
    }
});
