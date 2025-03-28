async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  inputField.value = "";
  inputField.disabled = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    addMessage("bot", data.response || "Sorry, something went wrong.");
  } catch (error) {
    console.error("Chat error:", error);
    addMessage("bot", "Sorry, there was an error.");
  } finally {
    inputField.disabled = false;
    inputField.focus();
  }
}

function clearChat() {
  document.getElementById("chatBox").innerHTML = "";
}

function addMessage(role, text) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-bubble ${role}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
