module.exports = {
  name: 'fragments',
  description: '查詢fragments點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) msg.channel.send('您未持有fragments\n為何不多參與活動賺點呢？');
        else {
          let fragmentscount = rows[0].fragments;
          msg.channel.send(`您持有的fragments點數總數為: ${fragmentscount}`);
        }

      });
    }
    else if (args[0] === 'add') {
      connection.query(`SELECT * FROM chaosjudge.fragment WHERE ID = '${msg.author.id}';`, (err, rows) => {
        if (err) throw err;
        let fragmentscount = rows[0].fragments;
        let targetID = msg.mentions.users.first().id;
        if (rows.length < 1) connection.query(`INSERT INTO chaosjudge.fragment (ID, fragments) VALUES('${targetID}', '${args[2]}');`);
        else connection.query(`UPDATE chaosjudge.fragment SET fragments = '${fragmentscount + parseInt(args[2])}' WHERE ID = '${targetID}';`);
        msg.reply('已完成fragments點數操作');
      });
    }
    else msg.reply(`無效參數${args[0]}`);
  },
};
