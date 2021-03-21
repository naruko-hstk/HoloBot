module.exports = {
  name: cp,
  description: '查詢CP點數數',
  execute(msg, args, connection) {
    if (!args.length) {
      connection.query(`SELECT * FROM chaosjudge.cp WHERE ID = '${msg.author.id}';`),
        (err, rows) => {
          if (err) throw err;
          if (rows.length < 1) msg.channel.send('您未持有CP點數\n為何不多參與活動賺點呢？');
          else {
            let cpcount = rows.cp;
            msg.channel.send(`您持有的CP點數總數為: ${cpcount}`);
          }
        };
    } else if (args[0] === add) {
      console.log('add');
    } else {
      msg.reply(`無效參數${args}`);
    }
  },
};
