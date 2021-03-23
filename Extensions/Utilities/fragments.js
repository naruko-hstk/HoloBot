module.exports = {
  name: 'fragments',
  description: '查詢fragments點數數',
  usage: '[add] <目標(請標記)> <數值>',
  execute(msg, args, connection) {
    connection.query(`SELECT * FROM chaosjudge.fragments WHERE ID = '${msg.author.id}';`), (err, rows) => {
      if (err) throw err;
      else {
        if (!args.length) {
          if (rows.length < 1) msg.channel.send('您未持有fragments\n為何不多參與活動賺點呢？');
          else {
            let fragmentscount = rows.fragments;
            msg.channel.send(`您持有的fragments點數總數為: ${fragmentscount}`);
          }
        } else if (args[0] === 'add') {
          let fragmentscount = rows.fragments;
          let targetID = msg.mentions.users.first().id;
          connection.query(`UPDATE chaosjudge.fragments SET fragments = '${fragmentscount}+${args[2]}' WHERE ID = '${targetID}';`);
          msg.reply('已完成fragments點數操作');
        } else {
          msg.reply(`無效參數${args[0]}`);
        }
      }
    };
  },
};
