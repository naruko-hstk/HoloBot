module.exports = {
  name: 'help',
  description: '顯示指令幫助',
  aliases: ['h', 'commands'],
  usage: '[指令名稱]',
  execute(msg, args, prefix) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push('這是我能使用的指令列表(部分為反映指令無須前綴即可觸發):\n');
      data.push(commands.map((command) => command.name).join('\n'));
      data.push(`使用\`${prefix}help [指令名稱]\`獲得指令詳細說明`);
      msg.channel.send(data, { split: true });
      // return msg.author
      //   .send(data, { split: true })
      //   .then(() => {
      //     if (msg.channel.type === 'dm') return;
      //     msg.reply("I've sent you a DM with all my commands!");
      //   })
      //   .catch((error) => {
      //     console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
      //     msg.reply("it seems like I can't DM you! Do you have DMs disabled?");
      //   });
    } else {
      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return msg.reply('沒有這條指令');
      }

      data.push(`**指令名稱:** ${command.name}`);

      if (command.aliases) data.push(`**指令別名:**${command.aliases.join(', ')}`);
      if (command.description) data.push(`**說明:**${command.description}`);
      if (command.usage) data.push(`**使用方法:**${prefix}${command.name} ${command.usage}`);
      if (command.cooldown) data.push(`**冷卻時間:**${command.cooldown}秒`);

      msg.channel.send(data, { split: true });
    }
  },
};

/* const Discord = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Help Menu',
  aliases: ['h'],
  execute(msg, args) {
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
          name: '自訂指令(可以忽略前綴)\n||我也不知道到底有哪些功能||',
          value: '日麻\n弟弟\n幹話王\n午餐(晚餐)ㄘ啥\ncomet\nshiar\nshig\nskill\nui\nvote\nばかみたい',
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
}; */
