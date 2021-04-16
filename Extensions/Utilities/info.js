const Discord = require('discord.js');
module.exports = {
  name: 'info',
  description: 'Get info',
  usage: '[user]',
  guildOnly: true,
  execute(msg, args, prefix, command, author, master) {
    if (!args.length) {
      let target = msg.author;
      let img = target.avatarURL({ format: 'png', size: 4096 });
      let info = new Discord.MessageEmbed()
        .setAuthor(`${target.username}`, `${img}`)
        .setDescription(`這是關於${target}的資訊`)
        .setThumbnail(img)
        .setColor('#39C5BB')
        .addFields(
          {
            name: '使用者名稱',
            value: `${target.username}`,
          },
          {
            name: '使用者ID',
            value: `${target.id}`,
          },
          {
            name: '帳號建立日期',
            value: `${target.createdAt}`,
          }
        )
        .setFooter('Powered by 結城あやの');
      msg.channel.send(info);
    } else {
      let target = msg.mentions.users.first();
      let img = target.avatarURL({ format: 'png', size: 4096 });
      let info = new Discord.MessageEmbed()
        .setAuthor(`${target.username}`, `${img}`)
        .setDescription(`這是關於${target}的資訊`)
        .setThumbnail(img)
        .setColor('#39C5BB')
        .addFields(
          {
            name: '使用者名稱',
            value: `${target.username}`,
          },
          {
            name: '使用者ID',
            value: `${target.id}`,
          },
          {
            name: '帳號建立日期',
            value: `${target.createdAt}`,
          }
        )
        .setFooter('Powered by 結城あやの');
      msg.channel.send(info);
    }
  },
};
