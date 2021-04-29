const Discord = require('discord.js');
module.exports = {
  name: 'arcaea',
  description: 'Arcaea難度表速查',
  args: true,
  // aliases: ['sdvx'],
  usage: '<難度> <等級>或<屬性>',
  needSQL: true,
  async execute(msg, args, prefix, command, author, master, connection) {
    const list = [];
    const nodata = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('查無資料').setDescription(`該難度無等級${args[1]}的曲子`).setFooter('Copyright © 結城あやの From SJ Bots');
    const level = args[1].replace('+', '.7');
    if (args[0] === 'past' || args[0] === 'pst') {
      await connection.query(`SELECT SongName, Side FROM chaosjudge.arcaea WHERE PastLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName + "(" + rows[counter].Side + ")";
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'present' || args[0] === 'prs') {
      await connection.query(`SELECT SongName, Side FROM chaosjudge.arcaea WHERE PresentLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName + "(" + rows[counter].Side + ")";
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'future' || args[0] === 'ftr') {

      await connection.query(`SELECT SongName, Side FROM chaosjudge.arcaea WHERE FutureLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName + "(" + rows[counter].Side + ")";
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === 'beyond' || args[0] === 'byd') {
      await connection.query(`SELECT SongName, Side FROM chaosjudge.arcaea WHERE BeyondLevel = ${parseFloat(level)};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = rows[counter].SongName + "(" + rows[counter].Side + ")";
            list.push(songs);
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === '光' || args[0] === 'Light' || args[0] === 'hikari') {
      await connection.query(`SELECT SongName, PastLevel, PresentLevel, FutureLevel, BeyondLevel FROM chaosjudge.arcaea WHERE Side = "光";`, (err, rows) => {
        if (err) throw err;
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            // if (rows[counter].BeyondLevel !== 0) {
            // let songs = rows[counter].SongName + ' PST:' + rows[counter].PastLevel + ' PRS:' + rows[counter].PresentLevel + ' FTR:' + rows[counter].FutureLevel + ' BYD:' + rows[counter].BeyondLevel;
            // list.push(songs);
            // }
            // else {
            let songs = rows[counter].SongName/* + ' PST:' + rows[counter].PastLevel + ' PRS:' + rows[counter].PresentLevel + ' FTR:' + rows[counter].FutureLevel*/;
            list.push(songs);
            // }
          }
          msg.channel.send(list);
        }
      });
    } else if (args[0] === '対立' || args[0] === 'Conflict' || args[0] === '對立' || args[0] === 'tairitsu') {
      await connection.query(`SELECT SongName, PastLevel, PresentLevel, FutureLevel, BeyondLevel FROM chaosjudge.arcaea WHERE Side = "対立";`, (err, rows) => {
        if (err) throw err;
        else {
          list.push(`共有**${rows.length}**首曲子：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            // if (rows[counter].BeyondLevel !== 0) {
            // let songs = rows[counter].SongName + ' PST:' + rows[counter].PastLevel + ' PRS:' + rows[counter].PresentLevel + ' FTR:' + rows[counter].FutureLevel + ' BYD:' + rows[counter].BeyondLevel;
            // list.push(songs);
            // }
            // else {
            let songs = rows[counter].SongName/* + ' PST:' + rows[counter].PastLevel + ' PRS:' + rows[counter].PresentLevel + ' FTR:' + rows[counter].FutureLevel*/;
            list.push(songs);
            // }
          }
          msg.channel.send(list);
        }
      });
    } else await msg.channel.send(`這條指令的用法應該要像這樣: \`${prefix}${command.name} ${command.usage}\``);
    connection.end();
    console.log('查詢完畢！\n已將資料庫斷線');
  },
};
