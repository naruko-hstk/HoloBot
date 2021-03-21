module.exports = {
    name: "fragments",
    description: "查詢殘片點數",
    execute(msg) {
        connection.query(`SELECT * FROM fragments WHERE ID = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            if (rows.length < 1) {
                msg.reply('您未持有fragments')
            } else {
                let fragmentscount = rows.cp;
                msg.reply(`您持有的fragments數為: **${fragmentscount}**`)
            }
            connection.query(sql);
        });
    }
};

