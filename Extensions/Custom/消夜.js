module.exports = {
	name: '消夜',
	description: '消夜合輯',
	aliases: ['消夜ㄘ啥', '消夜吃啥', '消夜？', '消夜?', '宵夜ㄘ啥', '宵夜吃啥', '宵夜？', '宵夜?'],
	execute(msg) {
		const messages = ['雞排', '泡麵', '再吃會變胖的\n略過吧'];
		const randomMessage = messages[Math.floor(Math.random() * messages.length)];
		msg.channel.send(randomMessage);
	},
};
