// script.js

// Ensure DOM is fully loaded before attaching handlers
window.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  // Attach event listeners to buttons (in case inline handlers don't work)
  document.querySelector("button[onclick='sendMessage()']").addEventListener("click", sendMessage);
  document.querySelector("button[onclick='clearChat()']").addEventListener("click", clearChat);

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      appendMessage("bot", data.reply || "Sorry, I couldn't understand that.");
    } catch (error) {
      console.error("Error:", error);
      appendMessage("bot", "There was an error processing your request.");
    }
  }

  function appendMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function clearChat() {
    chatBox.innerHTML = "";
  }
});
