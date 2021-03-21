module.exports = {
  name: 'fragments',
  description: '查詢殘片數',
  execute(msg, args, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.fragments WHERE ID = '${msg.author.id}';`),
        (err, rows) => {
          if (err) throw err;
          if (rows.length < 1) msg.channel.send('您未持有殘片\n為何不多參與活動賺點呢？');
          else {
            let fragmentscount = rows.fragments;
            msg.channel.send(`您持有的殘片總數為: ${fragmentscount}`);
          }
        };
    } else if (args[0] === add) {
      console.log('add');
    } else {
      msg.reply(`無效參數${args}`);
    }
  },
};
