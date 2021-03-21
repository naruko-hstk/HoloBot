module.exports = {
    name: 'info',
    description: 'Ping!',
    execute(msg) {
        let target = msg.mentions.users.first() || msg.author;
        let img = target.avatarURL({ format: 'png', size: 4096 });
        let message = await msg.channel.send(`正在生成${target}的資料`);
        let info = new Discord.MessageEmbed()
            .setAuthor(`${target.username}`, `${img}`)
            .setDescription(`這是關於${target}的資訊`)
            .setThumbnail(img)
            .setColor('#39C5BB')
            .addFields(
                {
                    name: '使用者名稱',
                    value: `${target.username}`,
                },
                {
                    name: '使用者ID',
                    value: `${target.id}`,
                },
                {
                    name: '帳號建立日期',
                    value: `${target.createdAt}`,
                }
            )
            .setFooter('Powered by 結城あやの');
        await msg.channel.send(info);
        await message.delete();
    },
};
