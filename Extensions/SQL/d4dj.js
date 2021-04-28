const Discord = require('discord.js');
module.exports = {
  name: 'd4dj',
  description: '邦邦難度表速查',
  args: true,
  aliases: [/*'打碟遊戲'*/],
  usage: '<難度> [等級]',
  needSQL: true,
  async execute(msg, args, prefix, command, author, master, connection) {
    const list = [];
    const nodata = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('查無資料').setDescription(`該難度無等級${args[1]}的歌`).setFooter('Copyright © 結城あやの From SJ Bots');
    const level = args[1].replace('+', '.5');
    if (args[0] === 'easy' || args[0] === 'ez') {
      await connection.query(`SELECT SongName FROM chaosjudge.d4dj WHERE EasyLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'normal' || args[0] === 'nr') {
      await connection.query(`SELECT SongName FROM chaosjudge.d4dj WHERE NormalLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'hard' || args[0] === 'hd') {
      await connection.query(`SELECT SongName FROM chaosjudge.d4dj WHERE HardLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'expert' || args[0] === 'ex') {
      await connection.query(`SELECT SongName FROM chaosjudge.d4dj WHERE ExpertLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName;
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else await msg.channel.send(`這條指令的用法應該要像這樣: \`${prefix}${command.name} ${command.usage}\``);
    connection.end();
    console.log('查詢完畢！\n已將資料庫斷線');
  },
};
