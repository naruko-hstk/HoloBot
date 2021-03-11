module.exports = {
  name: 'shutdown',
  description: 'shutdown bot',
  execute(msg, args) {
    msg.channel.send(`Goodbye!`);
    process.exit(0);
  },
};
