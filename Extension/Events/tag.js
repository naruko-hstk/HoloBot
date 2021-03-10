module.exports = {
  name: 'tag',
  description: 'Just tag',
  execute(msg) {
    msg.channel.send(`${msg.author}`);
  },
};
