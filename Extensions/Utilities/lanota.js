const Discord = require('discord.js');
module.exports = {
  name: 'lanota',
  description: 'Lanota難度表速查',
  args: true,
  usage: '<難度> [等級]',
  execute(msg, args, prefix, connection, command) {
    const list = [];
    const nodata = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('查無資料').setDescription(`該難度無等級${args[1]}的曲子`).setFooter('Copyright © 結城あやの From SJ Bots');
    if (args[0] === 'whisper') {
      connection.query(`SELECT SongName FROM chaosjudge.lanota WHERE WhisperLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'acoustic') {
      connection.query(`SELECT SongName FROM chaosjudge.lanota WHERE AcousticLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'ultra') {
      connection.query(`SELECT SongName FROM chaosjudge.lanota WHERE UltraLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'master') {
      connection.query(`SELECT SongName FROM chaosjudge.lanota WHERE MasterLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else msg.channel.send(`這條指令的用法應該要像這樣: \`${prefix}${command.name} ${command.usage}\``);
  },
};
