//include area
const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;
const { ReactionRoleMessage } = require('./Config/Config.json');
const fs = require('fs');
const mysql = require('mysql');

//Extension init
holo.commands = new Discord.Collection();
const commandCore = fs.readdirSync('./Extension/Core').filter((file) => file.endsWith('.js'));
const commandCustom = fs.readdirSync('./Extension/Custom').filter((file) => file.endsWith('.js'));
const commandError = fs.readdirSync('./Extension/Error').filter((file) => file.endsWith('.js'));
const commandEvents = fs.readdirSync('./Extension/Events').filter((file) => file.endsWith('.js'));
const commandFun = fs.readdirSync('./Extension/Fun').filter((file) => file.endsWith('.js'));
const commandModerations = fs.readdirSync('./Extension/Moderations').filter((file) => file.endsWith('.js'));
const commandUtilities = fs.readdirSync('./Extension/Utilities').filter((file) => file.endsWith('.js'));

//Call Extension
for (const file of commandCore) {
  const command = require(`./Extension/Core/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandCustom) {
  const command = require(`./Extension/Custom/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandError) {
  const command = require(`./Extension/Error/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandEvents) {
  const command = require(`./Extension/Events/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandFun) {
  const command = require(`./Extension/Fun/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandModerations) {
  const command = require(`./Extension/Moderations/${file}`);
  holo.commands.set(command.name, command);
}
for (const file of commandUtilities) {
  const command = require(`./Extension/Utilities/${file}`);
  holo.commands.set(command.name, command);
}

//Connect to DB
const connection = mysql.createConnection({
  host: process.env.address,
  user: process.env.account,
  password: process.env.password,
  database: process.env.database,
});
connection.connect((err) => {
  if (err) throw err;
  console.log('DB has been connected.');
});

//Actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({ activity: { name: 'Powered by 結城あやの | Using ~help', type: 'STREAMING' }, status: 'dnd' });
  console.log(`Logged in as ${holo.user.tag}!`);
});

//Commands with out prefix
holo.on('message', (msg) => {
  if (msg.content === '標我') {
    if (msg.channel.id !== '819553695766413334') {
      msg.channel.send('請至<#819553695766413334>使用');
    } else {
      // if (msg.author.id === '607446184847605800') {
      // msg.channel.send('我完全不想理你=.=')
      // } else if (msg.author.id === '573089564051111937') {
      // msg.channel.send('再說')
      // } else if (msg.author.id === '277389659947008001') {
      // msg.channel.send('作者還敢玩啊')
      // } else if (msg.author.id === '487804795902492712') {
      // msg.channel.send('你不要以為你開小號我就不會發現')
      // } else {
      holo.commands.get('tag').execute(msg);
      // }
    }
  } else if (msg.content === 'shig') {
    holo.commands.get('shig').execute(msg);
  } else if (msg.content === 'ui') {
    holo.commands.get('ui').execute(msg);
  } else if (msg.content === 'skill') {
    holo.commands.get('skill').execute(msg);
  } else if (msg.content === '日麻') {
    holo.commands.get('日麻').execute(msg);
  } else if (msg.content === 'shiar') {
    holo.commands.get('shiar').execute(msg);
  } else if (msg.content === 'vote') {
    holo.commands.get('vote').execute(msg);
  } else if (msg.content === 'ばかみたい') {
    holo.commands.get('ばかみたい').execute(msg);
  } else if (msg.content === 'comet') {
    holo.commands.get('comet').execute(msg);
  } else if (msg.content === '午餐ㄘ啥') {
    holo.commands.get('餐點').execute(msg);
  } else if (msg.content === '晚餐ㄘ啥') {
    holo.commands.get('餐點').execute(msg);
  } else if (msg.content === '幹話王') {
    holo.commands.get('幹話王').execute(msg);
  } else if (msg.content === '弟弟' || msg.content === '@⚓榭爾⚓#5939') {
    holo.commands.get('弟弟').execute(msg);
  } /*else if (msg.content === '') {
    holo.commands.get('').execute(msg);
  } /*else if (msg.content === '') {
    holo.commands.get('').execute(msg);
  } /*else if (msg.content === '') {
    holo.commands.get('').execute(msg);
  } */ else {
    return;
  }
});

//Commands require prefix
holo.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'shutdown') {
    if (msg.author.id === '277389659947008001' || msg.author.id === '487804795902492712') {
      holo.commands.get('shutdown').execute(msg);
    } else {
      holo.commands.get('shutdownerror').execute(msg);
    }
  } else if (command === 'help') {
    holo.commands.get('help').execute(msg);
  } else if (command === 'h') {
    holo.commands.get('help').execute(msg);
  } else if (command === 'ping') {
    holo.commands.get('ping').execute(msg);
  } else if (command === 'shig') {
    holo.commands.get('shig').execute(msg);
  } else if (command === 'ui') {
    holo.commands.get('ui').execute(msg);
  } else if (command === 'skill') {
    holo.commands.get('skill').execute(msg);
  } else if (command === '日麻') {
    holo.commands.get('日麻').execute(msg);
  } else if (command === 'shiar') {
    holo.commands.get('shiar').execute(msg);
  } else if (command === 'vote') {
    holo.commands.get('vote').execute(msg);
  } else if (command === 'ばかみたい') {
    holo.commands.get('ばかみたい').execute(msg);
  } else if (command === 'comet') {
    holo.commands.get('comet').execute(msg);
  } else if (command === '午餐ㄘ啥') {
    holo.commands.get('餐點').execute(msg);
  } else if (command === '晚餐ㄘ啥') {
    holo.commands.get('餐點').execute(msg);
  } else if (command === '幹話王') {
    holo.commands.get('幹話王').execute(msg);
  } else if (command === '弟弟') {
    holo.commands.get('弟弟').execute(msg);
  } else if (command === 'info') {
    holo.commands.get('info').execute(msg);
  } /*else if (command === '') {
    holo.commands.get('').execute(msg);
  } /*else if (command === '') {
    holo.commands.get('').execute(msg);
  } */ else {
    return;
  }
  //TODO: get info command
});

//Auto add role to new members
holo.on('guildMemberAdd', (member) => {
  holo.commands.get('welcome').execute(member);
});

//Reaction role

//Login
holo.login(process.env.token);
