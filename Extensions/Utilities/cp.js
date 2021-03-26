const Discord = require('discord.js');
module.exports = {
  name: 'cp',
  description: '查詢CP點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
          const nocp = new Discord.MessageEmbed()
            .setColor('#0F1D57')
            .setTitle('您未持有CP點數')
            .setDescription('為何不多參與活動賺點呢？')
            .setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(nocp);
        }
        else {
          let CygamesPointcount = rows[0].CygamesPoint;
          const cpinfo = new Discord.MessageEmbed()
            .setColor('#0F1D57')
            .setTitle('您持有的CP點數總數為:')
            .setDescription(`${CygamesPointcount}`)
            .setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(cpinfo);
        }
      });
    }
    else if (args[0] === 'add') {
      let targetID = msg.mentions.users.first().id;
      connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${targetID}';`, (err, rows) => {
        if (err) throw err;
        let CygamesPointcount = rows[0].CygamesPoint;
        if (rows.length < 1) connection.query(`INSERT INTO chaosjudge.cp (ID, CygamesPoint) VALUES('${targetID}', '${args[2]}');`);
        else connection.query(`UPDATE chaosjudge.cp SET CygamesPoint = '${CygamesPointcount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        const cpupdated = new Discord.MessageEmbed()
          .setColor('#0F1D57')
          .setTitle('系統通知')
          .setDescription('已完成fragments點數操作')
          .setFooter('Copyright © 結城あやの From SJ Bots');
        msg.channel.send(cpupdated);
      });
    }
    else msg.reply(`無效參數${args[0]}`);
  },
};
