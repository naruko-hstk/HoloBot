module.exports = {
  name: '午餐ㄘ啥',
  description: '食物合輯',
  execute(msg) {
    const messages = ['拉麵', '烏龍麵', '燒肉飯'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.channel.send(randomMessage);
  },
};
