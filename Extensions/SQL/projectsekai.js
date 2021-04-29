const Discord = require('discord.js');
module.exports = {
  name: 'projectsekai',
  description: 'PJSK難度表速查',
  args: true,
  aliases: ['pjsk'/*,'chunithm'*/],
  usage: '<難度> [等級]',
  needSQL: true,
  async execute(msg, args, prefix, command, author, master, connection) {
    await msg.channel.send('警告！\nID尚未驗證！');
    const list = [];
    const nodata = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('查無資料').setDescription(`該難度無等級${args[1]}的歌`).setFooter('Copyright © 結城あやの From SJ Bots');
    // const play = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('想打嗎？').setDescription('[點我線上打歌](https://player.banground.fun/)\n輸入上面查到的ID即可打歌').setFooter('Copyright © 結城あやの From SJ Bots');
    if (args[0] === 'easy' || args[0] === 'ez') {
      await connection.query(`SELECT id, SongName FROM chaosjudge.projectsekai WHERE EasyLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = 'ID：' + rows[counter].id + '	**' + rows[counter].SongName + '**';
            list.push(songs);
          }
          msg.channel.send(list);
          // msg.channel.send(play);
        }
      });
    } else if (args[0] === 'normal' || args[0] === 'nr' || args[0] === 'basic' || args[0] === 'bsc') {
      await connection.query(`SELECT id, SongName FROM chaosjudge.projectsekai WHERE NormalLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = 'ID：' + rows[counter].id + '	**' + rows[counter].SongName + '**';
            list.push(songs);
          }
          msg.channel.send(list);
          // msg.channel.send(play);
        }
      });
    } else if (args[0] === 'hard' || args[0] === 'hd' || args[0] === 'advance' || args[0] === 'adv') {
      await connection.query(`SELECT id, SongName FROM chaosjudge.projectsekai WHERE HardLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = 'ID：' + rows[counter].id + '	**' + rows[counter].SongName + '**';
            list.push(songs);
          }
          msg.channel.send(list);
          // msg.channel.send(play);
        }
      });
    } else if (args[0] === 'expert' || args[0] === 'ex' || args[0] === 'exp') {
      await connection.query(`SELECT id, SongName FROM chaosjudge.projectsekai WHERE ExpertLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = 'ID：' + rows[counter].id + '	**' + rows[counter].SongName + '**';
            list.push(songs);
          }
          msg.channel.send(list);
          // msg.channel.send(play);
        }
      });
    } else if (args[0] === 'master' || args[0] === 'ma' || args[0] === 'mas') {
      await connection.query(`SELECT id, SongName FROM chaosjudge.projectsekai WHERE MasterLevel = ${parseInt(args[1])};`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send(nodata);
        else {
          list.push(`共有**${rows.length}**首歌：\n`);
          let end = rows.length;
          for (var counter = 0; counter < end; counter++) {
            let songs = 'ID：' + rows[counter].id + '	**' + rows[counter].SongName + '**';
            list.push(songs);
          }
          msg.channel.send(list);
          // msg.channel.send(play);
        }
      });
    } else await msg.channel.send(`這條指令的用法應該要像這樣: \`${prefix}${command.name} ${command.usage}\``);
    connection.end();
    console.log('查詢完畢！\n已將資料庫斷線');
  },
};
