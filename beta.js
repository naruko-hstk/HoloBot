//include area
const Discord = require('discord.js');
const { on } = require('nodemon');
const holo = new Discord.Client();
const { token, prefix, ReactionRoleMessage } = require('./Config/Config.json');

//actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({ activity: { name: 'Powered by 結城あやの | Using /help', type: 'STREAMING' }, status: 'online' });
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
    msg.channel.send(`Pong!\n延遲${0 - (Date.now() - msg.createdTimestamp)}ms.`);
  } else if (command === 'help' || 'h') {
    const help = new Discord.MessageEmbed()
      .setColor('#0F1D57')
      .setTitle('Help')
      .setDescription('Powered By 結城あやの')
      .addFields(
        {
          name: '核心功能',
          value: 'help: 顯示此列表',
        },
        {
          name: '實用功能',
          value: 'ping: 測試延遲',
        },
        {
          name: '管理功能',
          value: 'warn: 警告使用者\nkick: 踢出使用者\nban: 封禁使用者\nmute: 水桶使用者\n||本區功能尚未實裝||',
        },
        {
          name: '娛樂功能',
          value: '@role: 提醒特定身分組活動\n||本區功能尚未實裝||',
        },
        {
          name: '無須前綴指令',
          value: '標我: 標註自己',
        }
      )
      .setFooter('Copyright © 結城あやの From SJ Bots');
    msg.channel.send(help);
  }
  //TODO: get info command
});

//auto add role to new members
holo.on('guildMemberAdd', (member) => {
  console.log('User ' + member.user.username + ' has joined the server!');
  var role = member.guild.roles.cache.find((role) => role.name == '訪客');
  member.roles.add(role);
});

//reaction role

holo.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == ReactionRoleMessage) {
    /*Reaction Set*/
    if (reaction.emoji.name === '811581504446398464') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763739420863102976');
    } else if (reaction.emoji.name === '792625830739968000') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763641242310410261');
    } else if (reaction.emoji.name === '778597254700204064') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763727368392540160');
    } else if (reaction.emoji.name === '799664934937034763') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('767320685097254912');
    } else if (reaction.emoji.name === '799667458696806430') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092504728830013');
    } else if (reaction.emoji.name === '791383827628425267') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212872035926076');
    } else if (reaction.emoji.name === '778633802724540487') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403802439974953');
    } else if (reaction.emoji.name === '789136396350652446') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779404650784227358');
    } else if (reaction.emoji.name === '789135851870355466') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('817400820705394689');
    } else if (reaction.emoji.name === '789135055514501170') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('771661750453403734');
    } else if (reaction.emoji.name === '788148860068954134') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059383579443211');
    } else if (reaction.emoji.name === '779037172094599229') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('777212938183245886');
    } else if (reaction.emoji.name === '778585187067625472') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764499423307759616');
    } else if (reaction.emoji.name === '777458564394516480') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779403176750219326');
    } else if (reaction.emoji.name === '770902729618751498') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779406886553256006');
    } else if (reaction.emoji.name === '784338347749146635') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871823069675570');
    } else if (reaction.emoji.name === '789135016114257921') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764871662684209192');
    } else if (reaction.emoji.name === '788148968697757736') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715864424874013');
    } else if (reaction.emoji.name === '779012695734091817') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779405390856716318');
    } else if (reaction.emoji.name === '780092493231685652') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783330286904541186');
    } else if (reaction.emoji.name === '771400089109004318') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779715735273603093');
    } else if (reaction.emoji.name === '779040605593665536') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('764797599295209502');
    } else if (reaction.emoji.name === '788149850201391135') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('779092377968443403');
    } else if (reaction.emoji.name === '779039089637851166') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('765597332154351660');
    } else if (reaction.emoji.name === '786690151555399742') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('763059462549798946');
    } else if (reaction.emoji.name === '779233129549398017') {
      await reaction.message.guild.members.cache.get(user.id).roles.add('783442151387168818');
    } else if (reaction.emoji.name === '799664250955366430') {
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
    if (reaction.emoji.name === '811581504446398464') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763739420863102976');
    } else if (reaction.emoji.name === '792625830739968000') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763641242310410261');
    } else if (reaction.emoji.name === '778597254700204064') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763727368392540160');
    } else if (reaction.emoji.name === '799664934937034763') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('767320685097254912');
    } else if (reaction.emoji.name === '799667458696806430') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092504728830013');
    } else if (reaction.emoji.name === '791383827628425267') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212872035926076');
    } else if (reaction.emoji.name === '778633802724540487') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403802439974953');
    } else if (reaction.emoji.name === '789136396350652446') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779404650784227358');
    } else if (reaction.emoji.name === '789135851870355466') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('817400820705394689');
    } else if (reaction.emoji.name === '789135055514501170') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('771661750453403734');
    } else if (reaction.emoji.name === '788148860068954134') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059383579443211');
    } else if (reaction.emoji.name === '779037172094599229') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('777212938183245886');
    } else if (reaction.emoji.name === '778585187067625472') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764499423307759616');
    } else if (reaction.emoji.name === '777458564394516480') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779403176750219326');
    } else if (reaction.emoji.name === '770902729618751498') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779406886553256006');
    } else if (reaction.emoji.name === '784338347749146635') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871823069675570');
    } else if (reaction.emoji.name === '789135016114257921') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764871662684209192');
    } else if (reaction.emoji.name === '788148968697757736') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715864424874013');
    } else if (reaction.emoji.name === '779012695734091817') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779405390856716318');
    } else if (reaction.emoji.name === '780092493231685652') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783330286904541186');
    } else if (reaction.emoji.name === '771400089109004318') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779715735273603093');
    } else if (reaction.emoji.name === '779040605593665536') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('764797599295209502');
    } else if (reaction.emoji.name === '788149850201391135') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('779092377968443403');
    } else if (reaction.emoji.name === '779039089637851166') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('765597332154351660');
    } else if (reaction.emoji.name === '786690151555399742') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('763059462549798946');
    } else if (reaction.emoji.name === '779233129549398017') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('783442151387168818');
    } else if (reaction.emoji.name === '799664250955366430') {
      await reaction.message.guild.members.cache.get(user.id).roles.remove('784477287117750347');
    }
  } else return;
});
//login
holo.login(token);
