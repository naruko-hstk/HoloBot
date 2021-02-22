//include area
const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
const { token, prefix } = require('./Config/Config.json');

//actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({ status: 'dnd', activity: { name: `Powered by YuukiAyano | Using / help`, type: 'STREAMING' } });
  console.log(`Logged in as ${holo.user.tag}!`);
  console.log(`Bot Author is ${holo.author}`);
});

//commands with out prefix
holo.on('message', (msg) => {
  if (msg.content === '標我') {
    msg.channel.send(`${msg.author}`);
  }
});

//commands require prefix
holo.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  /*
  if (command === 'shutdown') {
    //TODO: Set this command owner only!!!
    msg.channel.send(`Goodbye! ${Discord.Guild.name}`);
  }
  */

  if (command === 'ping') {
    msg.reply(`Pong!\n延遲${Date.now() - msg.createdTimestamp}ms.`);
  }
  if (command === 'help') {
    const help = new Discord.MessageEmbed()
      .setColor('#0F1D57')
      .setTitle('Help')
      .setDescription('Powered By結城あやの')
      .addFields(
        {
          name: '核心功能',
          value: 'help: 顯示此列表',
          inline: true,
        },
        {
          name: '實用功能',
          value: 'ping: 測試延遲',
          inline: true,
        },
        {
          name: '管理功能',
          value: 'warn: 警告使用者\nkick: 踢出使用者\nban: 封禁使用者\nmute: 水桶使用者',
          inline: true,
        },
        /*{
                    name: '',
                    value:'',
                    inline:false
                },*/
        {
          name: '娛樂功能',
          value: '@role: 提醒特定身分組活動',
          inline: true,
        },
        {
          name: '無須前綴指令',
          value: '標我: 標註自己',
          inline: true,
        }
      )
      .setFooter('Copyright © 結城あやの From SJ Bots');
    msg.channel.send(help);
  }
});

//auto add role to new members
holo.on('guildMemberAdd', (member) => {
  console.log('User' + member.user.username + 'has joined the server!');
  var role = member.guild.roles.find('name', '訪客');
  member.addRole(role);
});
//login
holo.login(token);
