module.exports = {
  name: 'cp',
  description: '查詢CP點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, connection) {
    connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${msg.author.id}';`), (err, rows) => {
      if (err) throw err;
      else {
        if (!args.length) {
          if (rows.length < 1) msg.channel.send('您未持有CP點數\n為何不多參與活動賺點呢？');
          else {
            let cpcount = rows.cp;
            msg.channel.send(`您持有的CP點數總數為: ${cpcount}`);
          }
        } else if (args[0] === 'add') {
          let cpcount = rows.cp;
          let targetID = msg.mentions.users.first().id;
          connection.query(`UPDATE chaosjudge.cp SET CP = '${cpcount}+${args[2]}' WHERE ID = '${targetID}';`);
          msg.reply('已完成CP點數操作');
        } else {
          msg.reply(`無效參數${args[0]}`);
        }
      }
    };
  },
};
