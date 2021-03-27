const Discord = require('discord.js');
module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg) {
    const ping = new Discord.MessageEmbed()
      .setColor('#0F1D57')
      .setTitle('Pong!')
      .setDescription(`延遲${0 - (Date.now() - msg.createdTimestamp)}ms.`)
      .setFooter('Copyright © 結城あやの From SJ Bots');
    msg.channel.send(ping);
  },
};
