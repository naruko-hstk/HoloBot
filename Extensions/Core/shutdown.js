module.exports = {
  name: 'shutdown',
  description: 'shutdown bot',
  execute(msg) {
    if (msg.author.id === '277389659947008001' || msg.author.id === '487804795902492712') {
      msg.reply('Goodbye!');
      process.exit(0);
    } else msg.reply('您無權這麼做！\n原因：不是作者');
  },
};
