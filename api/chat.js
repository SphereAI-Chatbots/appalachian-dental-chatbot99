function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const userText = userInput.value.trim();
  if (userText === "") return;

  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.textContent = userText;
  chatBox.appendChild(userBubble);
  userInput.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userText })
  })
  .then(res => res.json())
  .then(data => {
    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot";
    botBubble.textContent = data.reply || "No response from bot.";
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(err => {
    const errorBubble = document.createElement("div");
    errorBubble.className = "chat-bubble bot";
    errorBubble.textContent = "Error contacting the bot.";
    chatBox.appendChild(errorBubble);
    console.error("Chat API error:", err);
  });
}

function clearChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
}
