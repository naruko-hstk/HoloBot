module.exports.run = async (holo, msg, connection) => {
  connection.query(`SELECT * FROM fragments WHERE ID = '${msg.author.id}'`, (err, rows) => {
    if (err) throw err;

    let fragmentscount = rows.fragments;

    if (rows.length < 1) msg.reply('您未持有fragments');
    else {
      msg.reply(`您持有的fragments數為: **${fragmentscount}**`);
    }
    connection.query(sql);
  });
};
