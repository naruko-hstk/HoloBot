module.exports = {
  name: 'skill',
  description: '技能集成',
  execute(msg) {
    const messages = ['地爆天星流行錘', 'スターバースト・ストリーム！'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.channel.send(randomMessage);
  },
};
