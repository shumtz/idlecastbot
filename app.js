const express = require('express')
const app = express()
const Discord = require('discord.js')
const client = new Discord.Client()
const Canvas = require('canvas');
const port = process.env.PORT || 3000;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!!`)
});

const prefix = '!'

client.on('message', msg => {
		if (msg.content === `${prefix}ping` || msg.content === `${prefix}Ping`) {
		msg.channel.send('Pong.');
	} else if (msg.content === `${prefix}beep`) {
		msg.channel.send('Boop.');
		}
});

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

client.login('Njk4NjM3NjI4OTQxMDA5NjYx.XpIvKQ.JaNLVxNfwWw2k_INP6cS_R45fLQ');

app.listen(port, function() {                                                                             
    console.log('Umbler listening on port %s', port);                                                     
});                                                                                                       
       