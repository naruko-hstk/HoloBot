module.exports = {
    name: "cp",
    description: "查詢CP點數",
    execute(msg) {
        connection.query(`SELECT * FROM cp WHERE ID = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            if (rows.length < 1) {
                msg.reply('您未持有CP點數')
            } else {
                let cygamespoint = rows.cp;
                msg.reply(`您持有的CP點數為: **${cygamespoint}**點`)
            }
            connection.query(sql);
        });
    }
};
