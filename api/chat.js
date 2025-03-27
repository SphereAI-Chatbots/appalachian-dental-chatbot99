const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful, professional AI assistant for Appalachian Dental.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = chatResponse.choices[0]?.message?.content || "No response.";
    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};
