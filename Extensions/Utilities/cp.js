module.exports = {
  name: 'cp',
  description: '查詢CP點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send('您未持有CP點數\n為何不多參與活動賺點呢？');
        else {
          let CygamesPointcount = rows[0].CygamesPoint;
          msg.channel.send(`您持有的CP點數總數為: ${CygamesPointcount}`);
        }
      });
    }
    else if (args[0] === 'add') {
      connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        let CygamesPointcount = rows[0].CygamesPoint;
        let targetID = msg.mentions.users.first().id;
        if (rows.length < 1) connection.query(`INSERT INTO chaosjudge.cp (ID, CygamesPoint) VALUES('${targetID}', '${args[2]}');`);
        else connection.query(`UPDATE chaosjudge.cp SET CygamesPoint = '${CygamesPointcount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        msg.reply('已完成CP點數操作');
      });
    }
    else msg.reply(`無效參數${args[0]}`);
  },
};
