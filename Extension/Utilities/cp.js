module.exports.run = async (holo, msg, connection) => {
  connection.query(`SELECT * FROM cp WHERE ID = '${msg.author.id}'`, (err, rows) => {
    if (err) throw err;

    let sql;

    if (rows.length < 1) msg.reply('您未持有cp點數');
    else {
      let cpcount = rows.cp;
      msg.reply(`您持有的cp點數為: **${cpcount}**點`);
    }
    connection.query(sql);
  });
};
