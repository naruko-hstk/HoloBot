const Discord = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Help Menu',
  aliases: ['h'],
  execute(msg) {
    const help = new Discord.MessageEmbed()
      .setColor('#0F1D57')
      .setTitle('Help')
      .setDescription('Powered By 結城あやの')
      .addFields(
        {
          name: '核心功能',
          value: 'help: 顯示此列表',
        },
        {
          name: '自訂指令||我也不知道到底有哪些功能||',
          value: '午餐ㄘ啥\n日麻\ncomet\nshiar\nshig\nskill\nui\nvote\nばかみたい',
        },
        {
          name: '無須前綴指令',
          value: '標我: 標註自己',
        },
        {
          name: '娛樂功能',
          value: '@role: 提醒特定身分組活動\n||本區功能尚未實裝||',
        },
        {
          name: '管理功能',
          value: 'warn: 警告使用者\nkick: 踢出使用者\nban: 封禁使用者\nmute: 水桶使用者\n||本區功能尚未實裝||',
        },
        {
          name: '實用功能',
          value: 'ping: 測試延遲',
        }
      )
      .setFooter('Copyright © 結城あやの From SJ Bots');
    msg.channel.send(help);
  },
};
