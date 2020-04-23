const express = require('express')
const app = express()
const ytdl = require('ytdl-core');
const Discord = require('discord.js')
const client = new Discord.Client()
const Canvas = require('canvas');
const port = process.env.PORT || 3000;

// const webhookClient = new Discord.WebhookClient('702713565802528879', '9G8A1ilaNxwRcGT-7LO2HLDCI6OHKRKBNw_0loafhbr9O-zksMI9PPUrnK3WeMidPdT5');

const prefix = '!'

// client.on("message", message => {
//   let args = message.content.split(" ").slice(1);
//   if (message.content.startsWith(prefix + "createHook")) {
//     message.channel.createWebhook("IdleCast Bot", "https://i.imgur.com/p2qNFag.png")
//       .then(webhook => webhook.edit("IdleCast Bot", "https://i.imgur.com/p2qNFag.png")
//         .then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`))
//         .catch(console.error))
//       .catch(console.error);
//   }
// });

app.get('/', function (req, res) {
  res.send('BOT');
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!!`)
});

client.on('message', msg => {
		if (msg.content === `Are you working?` || msg.content === `are you working?`) {
		msg.channel.send('Yes!');
	}
});

client.on('message', msg => {
		if (msg.content === `Thank You` || msg.content === `thank you`) {
		msg.channel.send('<3');
	}
});

client.on('message', msg => {
		if (msg.content === `${prefix}ping` || msg.content === `${prefix}Ping`) {
		msg.channel.send('Pong.');
	}
});

client.on('message', msg => {
	if (msg.content === `Bom dia` || msg.content === `bom dia` || msg.content === `Bom Dia`) {
		msg.react('☀️');
		msg.channel.send(`Bom dia!`)
	}
})

client.on('message', msg => {
	if (msg.content === `Boa tarde` || msg.content === `boa tarde` || msg.content === `Boa Tarde`) {
		msg.react('🌥️')
		msg.channel.send(`Boa tarde!`)
	}
})

client.on('message', msg => {
	if (msg.content === `Boa noite` || msg.content === `boa noite` || msg.content === `Boa Noite`) {
		msg.react('🌑')
		msg.channel.send(`Boa noite!`)
	}
})

client.on('message', msg => {
	if(msg.content === `${prefix}Podcast` || msg.content === `${prefix}podcast`) {
		msg.channel.send('https://anchor.fm/idlecast')
	}
})

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '🚪bem-vindo');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper1.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Bem vindo ao servidor,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`${member}!`, attachment);
});

client.on('message', message => {
	if (message.content === '!play') {
		if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=eBG7P-K-r1Y', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			// dispatcher.on('finish', () => voiceChannel.leave());
			if (message.content === '!stop') {
				console.log(voiceChannel.leave())	
			}
		});
	}
});

client.login('Njk4NjM3NjI4OTQxMDA5NjYx.XqEKZg.36bddvrPw4rIlbOEf3AgEuN73Pc');

app.listen(port, function() {                                                                             
    console.log('Umbler listening on port %s', port);                                                     
});                                                                                                       
       