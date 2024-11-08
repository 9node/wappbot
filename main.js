const { Client,LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");


// Create a new client instance
const client = new Client({
	puppeteer: {
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			// browserWSEndpoint: 'ws://localhost:3000',
			browserURL: 'https://chromium.koyeb.app',
			timeout: 160*1000
	},
	authStrategy: new LocalAuth({
		dataPath: 'session'
})
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
	console.log("QR RECEIVED", qr);
	qrcode.generate(qr, { small: true  });
});

client.on('message_create', message => {
	console.log(message.type)
	if (message.body === '!ping') {
		// reply back "pong" directly to the message
		message.reply('pong');
	}
});


// Start your client
client.initialize();

// express hello world
const express = require('express');
const app = express();
const port = 5000;
app.get('/', (req, res) => res.send(`Hello World! = ${req.query.q}`));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));