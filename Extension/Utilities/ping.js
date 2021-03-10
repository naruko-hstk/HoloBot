module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args) {
    msg.channel.send(`Pong!\n延遲${0 - (Date.now() - msg.createdTimestamp)}ms.`);
  },
};
