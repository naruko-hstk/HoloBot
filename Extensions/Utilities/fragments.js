const Discord = require('discord.js');
module.exports = {
  name: 'fragments',
  description: '查詢fragments點數',
  usage: '[add] <目標(請標記)> <數值>',
  needSQL: true,
  async execute(msg, args, prefix, command, author, master, connection) {
    if (!args.length) {
      await connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${parseInt(msg.author.id)}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
          const nofragments = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您未持有Fragments').setDescription('為何不多參與活動賺點呢？').setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(nofragments);

          console.log('查詢完畢！\n已將資料庫斷線');
        } else {
          let FragmentsCount = rows[0].fragments;
          const fragmentsinfo = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您持有的Fragments總數為:').setDescription(`${FragmentsCount}`).setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(fragmentsinfo);
          connection.end();
          console.log('查詢完畢！\n已將資料庫斷線');
        }
      });
    } else if (args[0] === 'add') {
      let targetID = msg.mentions.users.first().id.replace(/[\\<>@#&!]/g, "")
      await connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${targetID}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) connection.query(`INSERT INTO chaosjudge.fragment (ID, fragments) VALUES('${targetID}', '${args[2]}');`);
        else {
          let FragmentsCount = rows[0].fragments;
          connection.query(`UPDATE chaosjudge.fragment SET fragments = '${FragmentsCount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        }
        const FragmentsUpdate = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('系統通知').setDescription('已完成fragments點數操作').setFooter('Copyright © 結城あやの From SJ Bots');
        msg.channel.send(FragmentsUpdate);
        connection.end();
        console.log('更新完畢！\n已將資料庫斷線');
      });
    } else msg.reply(`無效參數${args[0]}`);
  },
};
