module.exports = {
  name: 'comet',
  description: '由不明人士提供',
  execute(msg, args, prefix, command, author, master) {
    const messages = ['すいちゃんは今日もかわいい！', '彗星のごとく現れたスターの原石！アイドルVTuberの星街すいせいでーす。'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.channel.send(randomMessage);
  },
};
