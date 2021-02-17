const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
const { token, prefix } = require('./Config/Config.json');

holo.on('ready', () => {
    holo.user.setPresence({ status: 'dnd', activity: { name: `Powered by YuukiAyano | Using / help`, type: 'STREAMING' } });
    console.log(`Logged in as ${holo.user.tag}!`);
    console.log(`Bot Author is ${holo.author}`);
});

holo.on('message', (msg) => {
    if (msg.content === '標我') {
        msg.channel.send(`${msg.author}`);
    }
});

holo.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        msg.reply(`Pong!\n延遲${Date.now() - msg.createdTimestamp}ms.`);
    }
});

holo.login(token);
