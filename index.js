//include area
const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;
const { ReactionRoleMessage } = require('./Config/Config.json');
const fs = require('fs');

holo.commands = new Discord.Collection();
const commandCore = fs.readdirSync('./Extension/Core').filter((file) => file.endsWith('.js'));
const commandEvents = fs.readdirSync('./Extension/Events').filter((file) => file.endsWith('.js'));
const commandFun = fs.readdirSync('./Extension/Fun').filter((file) => file.endsWith('.js'));
const commandModerations = fs.readdirSync('./Extension/Moderations').filter((file) => file.endsWith('.js'));
const commandUtilities = fs.readdirSync('./Extension/Utilities').filter((file) => file.endsWith('.js'));

for (const file of commandCore) {
  const command = require(`./Extension/Core/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  holo.commands.set(command.name, command);
}
for (const file of commandEvents) {
  const command = require(`./Extension/Events/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  holo.commands.set(command.name, command);
}
for (const file of commandFun) {
  const command = require(`./Extension/Fun/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  holo.commands.set(command.name, command);
}
for (const file of commandModerations) {
  const command = require(`./Extension/Moderations/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  holo.commands.set(command.name, command);
}
for (const file of commandUtilities) {
  const command = require(`./Extension/Utilities/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  holo.commands.set(command.name, command);
}
//actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({ activity: { name: 'Powered by 結城あやの | Using /help', type: 'STREAMING' }, status: 'dnd' });
  console.log(`Logged in as ${holo.user.tag}!`);
  console.log(`Bot Author is ${holo.author}`);
});

//commands with out prefix
holo.on('message', (msg) => {
  if (msg.content === '標我') {
    holo.commands.get('tag').execute(msg);
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
    holo.commands.get('ping').execute(msg, args);
  } else if (command === 'help' || 'h') {
    holo.commands.get('help').execute(msg, args);
  }
  //TODO: get info command
});

//auto add role to new members
holo.on('guildMemberAdd', (member) => {
  holo.commands.get('welcome').execute(member);
});

//reaction role

holo.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == ReactionRoleMessage) {
    /*Reaction Set*/
    if (reaction.emoji.name === ':YAGOO_AND_GUN:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763739420863102976');
    } else if (reaction.emoji.name === ':watame_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763641242310410261');
    } else if (reaction.emoji.name === ':watame_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763727368392540160');
    } else if (reaction.emoji.name === ':Wake_up:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('767320685097254912');
    } else if (reaction.emoji.name === ':Waifu:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092504728830013');
    } else if (reaction.emoji.name === ':uto_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212872035926076');
    } else if (reaction.emoji.name === ':suisei_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403802439974953');
    } else if (reaction.emoji.name === ':sora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779404650784227358');
    } else if (reaction.emoji.name === ':shion_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('817400820705394689');
    } else if (reaction.emoji.name === ':rushia_6:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('771661750453403734');
    } else if (reaction.emoji.name === ':rushia_5:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059383579443211');
    } else if (reaction.emoji.name === ':rushia_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212938183245886');
    } else if (reaction.emoji.name === ':rushia_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764499423307759616');
    } else if (reaction.emoji.name === ':rushia_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403176750219326');
    } else if (reaction.emoji.name === ':rushia_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779406886553256006');
    } else if (reaction.emoji.name === ':polka_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871823069675570');
    } else if (reaction.emoji.name === ':pekora_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871662684209192');
    } else if (reaction.emoji.name === ':pekora_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715864424874013');
    } else if (reaction.emoji.name === ':pekora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779405390856716318');
    } else if (reaction.emoji.name === ':pekora_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783330286904541186');
    } else if (reaction.emoji.name === ':padoru_aloe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715735273603093');
    } else if (reaction.emoji.name === ':okayu_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764797599295209502');
    } else if (reaction.emoji.name === ':noel_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092377968443403');
    } else if (reaction.emoji.name === ':neee_ayame:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('765597332154351660');
    } else if (reaction.emoji.name === ':neee_aqua:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059462549798946');
    } else if (reaction.emoji.name === ':neee_anemachi:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783442151387168818');
    } else if (reaction.emoji.name === ':Nakiri_axe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('784477287117750347');
    }
  } else return;
});

holo.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == ReactionRoleMessage) {
    /*Reaction Set*/
    if (reaction.emoji.name === ':YAGOO_AND_GUN:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763739420863102976');
    } else if (reaction.emoji.name === ':watame_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763641242310410261');
    } else if (reaction.emoji.name === ':watame_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763727368392540160');
    } else if (reaction.emoji.name === ':Wake_up:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('767320685097254912');
    } else if (reaction.emoji.name === ':Waifu:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092504728830013');
    } else if (reaction.emoji.name === ':uto_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212872035926076');
    } else if (reaction.emoji.name === ':suisei_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403802439974953');
    } else if (reaction.emoji.name === ':sora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779404650784227358');
    } else if (reaction.emoji.name === ':shion_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('817400820705394689');
    } else if (reaction.emoji.name === ':rushia_6:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('771661750453403734');
    } else if (reaction.emoji.name === ':rushia_5:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059383579443211');
    } else if (reaction.emoji.name === ':rushia_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212938183245886');
    } else if (reaction.emoji.name === ':rushia_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764499423307759616');
    } else if (reaction.emoji.name === ':rushia_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403176750219326');
    } else if (reaction.emoji.name === ':rushia_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779406886553256006');
    } else if (reaction.emoji.name === ':polka_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871823069675570');
    } else if (reaction.emoji.name === ':pekora_4:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871662684209192');
    } else if (reaction.emoji.name === ':pekora_3:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715864424874013');
    } else if (reaction.emoji.name === ':pekora_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779405390856716318');
    } else if (reaction.emoji.name === ':pekora_2:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783330286904541186');
    } else if (reaction.emoji.name === ':padoru_aloe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715735273603093');
    } else if (reaction.emoji.name === ':okayu_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764797599295209502');
    } else if (reaction.emoji.name === ':noel_1:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092377968443403');
    } else if (reaction.emoji.name === ':neee_ayame:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('765597332154351660');
    } else if (reaction.emoji.name === ':neee_aqua:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059462549798946');
    } else if (reaction.emoji.name === ':neee_anemachi:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783442151387168818');
    } else if (reaction.emoji.name === ':Nakiri_axe:') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('784477287117750347');
    }
  } else return;
});
//login
holo.login(process.env.token);
