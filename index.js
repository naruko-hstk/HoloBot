//include area
const Discord = require('discord.js');
const holo = new Discord.Client();
require('dotenv').config();
const prefix = process.env.prefix;
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

//Connect to DB
const connection = mysql.createConnection({
	host: process.env.address,
	user: process.env.account,
	password: process.env.password,
	database: process.env.database,
});
connection.connect((err) => {
	if (err) throw err;
	console.log('DB has been connected.');
});

//Actions of bot ready
holo.on('ready', () => {
	holo.user.setPresence({
		activity: {
			name: 'Powered by 結城あやの | Using ~help',
			type: 'STREAMING',
		},
		status: 'dnd',
	});
	console.log(`Logged in as ${holo.user.tag}!`);
});

//command handler
holo.on('message', (msg) => {
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = holo.commands.get(commandName) || holo.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!msg.content.startsWith(prefix) || msg.author.bot) {
		if (msg.content === '標我') {
			if (msg.channel.id !== '819553695766413334') msg.channel.send('請至<#819553695766413334>使用');
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
		else if (msg.content === '午餐ㄘ啥' || msg.content === '午餐吃啥' || msg.content === '午餐?' || msg.content === '午餐？' || msg.content === '晚餐ㄘ啥' || msg.content === '晚餐吃啥' || msg.content === '晚餐?' || msg.content === '晚餐？') holo.commands.get('餐點').execute(msg);
		else if (msg.content === '消夜ㄘ啥' || msg.content === '消夜吃啥' || msg.content === '消夜?' || msg.content === '消夜？' || msg.content === '宵夜ㄘ啥' || msg.content === '宵夜吃啥' || msg.content === '宵夜?' || msg.content === '宵夜？') holo.commands.get('消夜').execute(msg);
		else if (msg.content === '幹話王') holo.commands.get('幹話王').execute(msg);
		else if (msg.content === '弟弟') holo.commands.get('弟弟').execute(msg);
		// else if (msg.content === '') holo.commands.get('').execute(msg);
		// else if (msg.content === '') holo.commands.get('').execute(msg);
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

		try {
			command.execute(msg, args, prefix, connection, command);
		} catch (error) {
			msg.channel.send(`<@277389659947008001>Bot炸啦\n<@487804795902492712>Bot炸啦\n\`\`\`${error}\`\`\``);
		}
	}
});

//command handler Old
/* holo.on('message', (msg) => {
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    //Command without prefix
    if (msg.content === '標我') {
      if (msg.channel.id !== '819553695766413334') msg.channel.send('請至<#819553695766413334>使用');
      else holo.commands.get('tag').execute(msg);
      // } else {
      // if (msg.author.id === '607446184847605800') {
      // msg.channel.send('我完全不想理你=.=');
      // } else if (msg.author.id === '573089564051111937') {
      // msg.channel.send('再說');
      // } else if (msg.author.id === '277389659947008001') {
      // msg.channel.send('作者還敢玩啊');
      // } else if (msg.author.id === '487804795902492712') {
      // msg.channel.send('你不要以為你開小號我就不會發現');
      // } else {
      // holo.commands.get('tag').execute(msg);
      // }
      // }
    } else if (msg.content === 'shig') holo.commands.get('shig').execute(msg);
    else if (msg.content === 'ui') holo.commands.get('ui').execute(msg);
    else if (msg.content === 'skill') holo.commands.get('skill').execute(msg);
    else if (msg.content === '日麻') holo.commands.get('日麻').execute(msg);
    else if (msg.content === 'shiar') holo.commands.get('shiar').execute(msg);
    else if (msg.content === 'vote') holo.commands.get('vote').execute(msg);
    else if (msg.content === 'ばかみたい') holo.commands.get('ばかみたい').execute(msg);
    else if (msg.content === 'comet') holo.commands.get('comet').execute(msg);
    else if (msg.content === '午餐ㄘ啥') holo.commands.get('餐點').execute(msg);
    else if (msg.content === '晚餐ㄘ啥') holo.commands.get('餐點').execute(msg);
    else if (msg.content === '幹話王') holo.commands.get('幹話王').execute(msg);
    else if (msg.content === '弟弟') holo.commands.get('弟弟').execute(msg);
    // else if (msg.content === '') holo.commands.get('').execute(msg);
    // else if (msg.content === '') holo.commands.get('').execute(msg);
    // else if (msg.content === '') holo.commands.get('').execute(msg);
    else return;
  }
  //Command with prefix
  else if (command === 'shutdown') {
    if (msg.author.id === '277389659947008001' || msg.author.id === '487804795902492712') holo.commands.get('shutdown').execute(msg);
    else holo.commands.get('shutdownerror').execute(msg);
  } else if (command === 'help' || command === 'h') holo.commands.get('help').execute(msg);
  else if (command === 'ping') holo.commands.get('ping').execute(msg);
  else if (command === 'shig') holo.commands.get('shig').execute(msg);
  else if (command === 'ui') holo.commands.get('ui').execute(msg);
  else if (command === 'skill') holo.commands.get('skill').execute(msg);
  else if (command === '日麻') holo.commands.get('日麻').execute(msg);
  else if (command === 'shiar') holo.commands.get('shiar').execute(msg);
  else if (command === 'vote') holo.commands.get('vote').execute(msg);
  else if (command === 'ばかみたい') holo.commands.get('ばかみたい').execute(msg);
  else if (command === 'comet') holo.commands.get('comet').execute(msg);
  else if (command === '午餐ㄘ啥') holo.commands.get('餐點').execute(msg);
  else if (command === '晚餐ㄘ啥') holo.commands.get('餐點').execute(msg);
  else if (command === '幹話王') holo.commands.get('幹話王').execute(msg);
  else if (command === '弟弟') holo.commands.get('弟弟').execute(msg);
  else if (command === 'info') holo.commands.get('info').execute(msg);
  else if (command === 'fragments') holo.commands.get('fragments').execute(msg, args);
  else if (command === 'cp') holo.commands.get('cp').execute(msg, args);
  else {
    return;
  }
}); */

//Auto add role to new members
// holo.on('guildMemberAdd', (member) => {
//   holo.commands.get('welcome').execute(member);
// });

//Reaction role

//Login
holo.login(process.env.token);
