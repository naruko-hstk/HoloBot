module.exports = {
  name: 'shutdown',
  description: 'shutdown bot',
  execute(msg) {
    msg.reply('Goodbye!');
    process.exit(0);
  },
};
