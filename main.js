const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const respond = require("./groq.js");

// Create a new client instance
const client = new Client({
	puppeteer: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		browserURL: process.env.CHROMIUM_URL,
		timeout: 160 * 1000,
	},
	authStrategy: new LocalAuth({
		dataPath: "session",
	}),
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
	console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
	console.log("QR RECEIVED", qr);
	qrcode.generate(qr, { small: true });
});

let sentLoveYou = false;

setInterval(
	() => {
		sentLoveYou = false;
	},
	5 * 60 * 1000,
); // every 10 mins
client.on("message_create", (message) => {
	if (message.type === "chat") {
		// Mary zub
		if (message.from === "919760599498@c.us") {
			if (!sentLoveYou && message.body !== "I hate you idiot!") {
				message.reply("I love you!");
			} else sentLoveYou = true;

			// message.react('❤️')

			if (message.body.trim().toLowerCase().startsWith("jaan")) {
				respond(message.body.trim().substring(4)).then((response) =>
					message.reply(String(response)),
				);
			}
		}
	}
	// if (message.body === '!ping') {
	// 	// reply back "pong" directly to the message
	// 	message.reply('pong');
	// }
	// if (message.from([
	// 	+'919760599498'
	// ]))
	// message.reply(message.body)
	// else {
	// }
	// message.getContact().then(c=> console.log("promise", c.id, c.number, c.name,))
	console.log("author:", message.author);
	console.log("message.id.remote:", message.id.remote);
	console.log("from:", message.from);
	console.log("to:", message.to);
	// console.log()
});

// Start your client
client.initialize();

// express hello world
const express = require("express");
const app = express();
const port = 5000;
app.get("/", (req, res) => res.send(`Hello World! = ${req.query.q}`));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
