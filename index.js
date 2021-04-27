//config here
require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix;
const author = process.env.author.toString();
const master = process.env.master.toString();
const interactionchannel = process.env.interactionchannel.toString();
const address = process.env.address;
const account = process.env.account;
const password = process.env.password;
const database = process.env.database;

//include area
const Discord = require('discord.js');
const holo = new Discord.Client();
const fs = require('fs');
const mysql = require('mysql');

//Extension init
holo.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./Extensions');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./Extensions/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./Extensions/${folder}/${file}`);
    holo.commands.set(command.name, command);
  }
}

//Test Connection
const testdb = mysql.createConnection({
  host: address,
  user: account,
  password: password,
  database: database,
});
testdb.connect((err) => {
  if (err) throw err;
  console.log('正在測試資料庫連線...\n資料庫已成功連線!');
  testdb.end();
  console.log('測試完畢!\n已將資料庫斷線')
});

//Actions of bot ready
holo.on('ready', () => {
  holo.user.setPresence({
    activity: {
      name: `Powered by 結城あやの | Using ${prefix}help`,
      type: 'STREAMING',
    },
    status: 'dnd',
  });
  console.log(`已登入使用者：${holo.user.tag}!\n作者：結城あやの`);
});

//command handler
holo.on('message', async (msg) => {
  const args = msg.content.slice(prefix.length).trim().toLowerCase().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = holo.commands.get(commandName) || holo.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (msg.author.bot) return;
  else {
    if (!msg.content.startsWith(prefix)) {
      if (msg.content === '標我') {
        if (msg.channel.id !== interactionchannel) msg.channel.send(`請至<#${interactionchannel}>使用`);
        else holo.commands.get('標我').execute(msg);
        // } else {
        // if (msg.author.id === '607446184847605800') msg.channel.send('我完全不想理你=.=');
        // else if (msg.author.id === '573089564051111937') msg.channel.send('再說');
        // else if (msg.author.id === '277389659947008001') msg.channel.send('作者還敢玩啊');
        // else if (msg.author.id === '487804795902492712') msg.channel.send('你不要以為你開小號我就不會發現');
        // else holo.commands.get('tag').execute(msg);
        // }
      } else if (msg.content === 'shig') holo.commands.get('shig').execute(msg);
      else if (msg.content === 'ui') holo.commands.get('ui').execute(msg);
      else if (msg.content === 'skill') holo.commands.get('skill').execute(msg);
      else if (msg.content === '日麻') holo.commands.get('日麻').execute(msg);
      else if (msg.content === 'shiar') holo.commands.get('shiar').execute(msg);
      else if (msg.content === 'vote') holo.commands.get('vote').execute(msg);
      else if (msg.content === 'ばかみたい') holo.commands.get('ばかみたい').execute(msg);
      else if (msg.content === 'comet') holo.commands.get('comet').execute(msg);
      else if (msg.content === '早餐ㄘ啥' || msg.content === '早餐吃啥' || msg.content === '早餐?' || msg.content === '早餐？') holo.commands.get('早餐').execute(msg);
      else if (
        msg.content === '午餐ㄘ啥' ||
        msg.content === '午餐吃啥' ||
        msg.content === '午餐?' ||
        msg.content === '午餐？' ||
        msg.content === '晚餐ㄘ啥' ||
        msg.content === '晚餐吃啥' ||
        msg.content === '晚餐?' ||
        msg.content === '晚餐？'
      )
        holo.commands.get('餐點').execute(msg);
      else if (
        msg.content === '消夜ㄘ啥' ||
        msg.content === '消夜吃啥' ||
        msg.content === '消夜?' ||
        msg.content === '消夜？' ||
        msg.content === '宵夜ㄘ啥' ||
        msg.content === '宵夜吃啥' ||
        msg.content === '宵夜?' ||
        msg.content === '宵夜？'
      )
        holo.commands.get('消夜').execute(msg);
      else if (msg.content === '幹話王') holo.commands.get('幹話王').execute(msg);
      else if (msg.content === '弟弟') holo.commands.get('弟弟').execute(msg);
      // else if (msg.content === '') holo.commands.get('').execute(msg);
      else return;
    } else if (!command) return;
    else {
      if (command.guildOnly && msg.channel.type === 'dm') {
        return msg.reply('這條指令無法在DM執行!');
      }

      if (command.permissions) {
        const authorPerms = msg.channel.permissionsFor(msg.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
          return msg.reply(`您**無法**這麼做\n原因：缺少權限 **${command.permissions}**`);
        }
      }

      if (command.args && !args.length) {
        let reply = `您未提供任何參數!`;

        if (command.usage) {
          reply += `\n這條指令的用法應該要像這樣： \`${prefix}${command.name} ${command.usage}\``;
        }

        return msg.reply(reply);
      }
      if (command.needSQL) {
        try {
          const connection = mysql.createConnection({
            host: address,
            user: account,
            password: password,
            database: database,
          });
          connection.connect(async (err) => {
            if (err) throw err;
            console.log('資料庫已成功連線!');
            await command.execute(msg, args, prefix, command, author, master, connection);
            // connection.end();
            // console.log('查詢完畢！\n已將資料庫斷線');
          });
          // return msg.reply('由於SQL Server尚未上線\n無法使用此功能');
        }
        catch (error) {
          msg.channel.send(`<@${author}>Bot炸啦\n<@${master}>Bot炸啦\n\`\`\`${error}\`\`\``);
        }
      } else {
        try {
          command.execute(msg, args, prefix, command, author, master);
        } catch (error) {
          msg.channel.send(`<@${author}>Bot炸啦\n<@${master}>Bot炸啦\n\`\`\`${error}\`\`\``);
        }
      }
    }
  }
});

//Login
holo.login(token);
