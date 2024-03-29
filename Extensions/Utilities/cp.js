const Discord = require('discord.js');
module.exports = {
  name: 'cp',
  description: '查詢CP點數',
  usage: '[add] <目標(請標記)> <數值>',
  needSQL: true,
  async execute(msg, args, prefix, command, author, master, connection) {
    if (!args.length) {
      await connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${parseInt(msg.author.id)}';`, async (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
          const nocp = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您未持有CP點數').setDescription('為何不多參與活動賺點呢？').setFooter('Copyright © 結城あやの From SJ Bots');
          await msg.channel.send(nocp);
          // connection.end();
          // console.log('查詢完畢！\n已將資料庫斷線');
        } else {
          let CygamesPointcount = rows[0].CygamesPoint;
          const cpinfo = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您持有的CP點數總數為:').setDescription(`${CygamesPointcount}`).setFooter('Copyright © 結城あやの From SJ Bots');
          await msg.channel.send(cpinfo);
          // connection.end();
          // console.log('查詢完畢！\n已將資料庫斷線');
        }
      });
    } else if (args[0] === 'add') {
      let targetID = msg.mentions.users.first().id.replace(/[\\<>@#&!]/g, "");
      await connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${targetID}';`, async (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) await connection.query(`INSERT INTO chaosjudge.cp (ID, CygamesPoint) VALUES('${targetID}', '${args[2]}');`);
        else {
          let CygamesPointcount = rows[0].CygamesPoint;
          await connection.query(`UPDATE chaosjudge.cp SET CygamesPoint = '${CygamesPointcount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        }
        const cpupdated = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('系統通知').setDescription('已完成fragments點數操作').setFooter('Copyright © 結城あやの From SJ Bots');
        await msg.channel.send(cpupdated);
        connection.end();
        console.log('更新完畢！\n已將資料庫斷線');
      });
    } else await msg.reply(`無效參數${args[0]}`);
  },
};
