export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message format" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful dental office assistant focused on explaining dental insurance, procedure codes, and billing questions in a friendly way.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      return res.status(200).json({ reply: data.choices[0].message.content.trim() });
    } else {
      console.error("OpenAI API error:", data);
      return res.status(500).json({ error: "Bot error: Invalid response from OpenAI." });
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Bot error: Something went wrong." });
  }
}
