const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;

const client = new GoogleGenerativeAI({
	apiKey: process.env.GEMINI_API_KEY,
});

const gemini = client.getGenerativeModel({
	model: "gemini-pro",
});

console.log("Gemini API key:", gemini.apiKey);

const respond = async (prompt) => {
	const response = await gemini.generateContent(prompt);
	return response.response.text();
};

module.exports = respond;
