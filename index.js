const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, 
    Discord.GatewayIntentBits.GuildModeration, Discord.GatewayIntentBits.GuildMessageReactions] })

client.login(process.env.API_KEY);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', (message) => {
    const baronRegex = /garbage|baron/i;
    if (baronRegex.test(message)) { 
        message.channel.send('Greetings')
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        const ratRegex = /rat/i // create a case-insensitive regex
        let role = newMember.guild.roles.cache.find(role => role.name === 'Rat')
        if (ratRegex.test(newMember.nickname) || newMember.nickname.includes('🐀') || newMember.nickname.includes('🐭') || newMember.nickname.includes('🐁')) {
            newMember.roles.add(role)
            
            const channel = newMember.guild.channels.cache.get('621976580977065995');
            channel.send(`${newMember.user.tag} is now one of us.`);
        }else{
            newMember.roles.remove(role)
            
            const channel = newMember.guild.channels.cache.get('621976580977065995');
            channel.send(`${newMember.user.tag} has forsaken their oath.`);
        }
    }
});
