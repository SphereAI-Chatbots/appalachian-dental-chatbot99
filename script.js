const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// Send message to server
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  addMessage(message, 'user');
  userInput.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const botReply = data.response || "Sorry, I didn't understand that.";
    addMessage(botReply, 'bot');
  } catch (error) {
    addMessage("Oops! Something went wrong. Please try again later.", 'bot');
    console.error(error);
  }
}

// Display message in chat box
function addMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Clear all chat messages
function clearChat() {
  chatBox.innerHTML = '';
}
