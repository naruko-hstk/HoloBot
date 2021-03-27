const Discord = require('discord.js');
module.exports = {
  name: 'fragments',
  description: '查詢fragments點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, prefix, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
          const nofragments = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您未持有fragments').setDescription('為何不多參與活動賺點呢？').setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(nofragments);
        } else {
          let fragmentscount = rows[0].fragments;
          const fragmentinfo = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('您持有的fragments總數為:').setDescription(`${fragmentscount}`).setFooter('Copyright © 結城あやの From SJ Bots');
          msg.channel.send(fragmentinfo);
        }
      });
    } else if (args[0] === 'add') {
      let targetID = msg.mentions.users.first().id;
      connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${targetID}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) connection.query(`INSERT INTO chaosjudge.fragment (ID, fragments) VALUES('${targetID}', '${args[2]}');`);
        else {
          let fragmentscount = rows[0].fragments;
          connection.query(`UPDATE chaosjudge.fragment SET fragments = '${fragmentscount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        }
        const fragmentupdated = new Discord.MessageEmbed().setColor('#0F1D57').setTitle('系統通知').setDescription('已完成fragments點數操作').setFooter('Copyright © 結城あやの From SJ Bots');
        msg.channel.send(fragmentupdated);
      });
    } else msg.reply(`無效參數${args[0]}`);
  },
};
