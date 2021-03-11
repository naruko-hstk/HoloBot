module.exports = {
  name: 'shutdownerror',
  description: 'shutdown error',
  execute(msg, args) {
    msg.channel.send(`You can't do that!\nYou are not <@277389659947008001> or <@487804795902492712>`);
  },
};
