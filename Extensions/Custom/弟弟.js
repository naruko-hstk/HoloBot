module.exports = {
    name: '弟弟',
    description: '結城あやの提供',
    execute(msg) {
        const messages = [
            '一種可愛的生物',
            '一種可愛的生物',
            '一種可愛的生物',
            '一種可愛的生物',
            '傲嬌又可愛的生物',
            '傲嬌又可愛的生物',
            '傲嬌又可愛的生物',
            '傲嬌又可愛的生物\n就像貓咪',
            '傲嬌又可愛的生物\n就像貓咪',
            '脖子被折的迷樣生命體'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        msg.channel.send(randomMessage);
    },
};
