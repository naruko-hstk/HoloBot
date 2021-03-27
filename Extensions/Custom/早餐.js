module.exports = {
	name: '早餐',
	description: '早餐合輯',
	aliases: ['早餐ㄘ啥', '早餐吃啥', '早餐？', '早餐?'],
	execute(msg) {
		const messages = ['鬆餅', '吐司', '炒蛋', '麥片', '麵包'];
		const randomMessage = messages[Math.floor(Math.random() * messages.length)];
		msg.channel.send(randomMessage);
	},
};
