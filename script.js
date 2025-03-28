document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.addEventListener("click", sendMessage);
});

async function sendMessage() {
  const userInput = document.getElementById("userInput").value.trim();
  const chatBox = document.getElementById("chatBox");
  if (!userInput) return;

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  chatBox.innerHTML += `
    <div class="chat-bubble user">
      <div class="text-sm font-semibold mb-1">You <span class="text-xs text-gray-500">(${timestamp})</span></div>
      <p>${userInput}</p>
    </div>
  `;

  document.getElementById("userInput").value = "";
  chatBox.innerHTML += `
    <div class="chat-bubble bot italic text-gray-400" id="loading">AI is thinking...</div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON");
    }

    const data = await response.json();
    const reply = (data.response || "No response.").replace(/\n/g, "<br>");
    document.getElementById("loading").remove();
    chatBox.innerHTML += `
      <div class="chat-bubble bot">
        <div class="text-sm font-semibold mb-1">AI <span class="text-xs text-gray-500">(${timestamp})</span></div>
        <p>${reply}</p>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("loading").remove();
    chatBox.innerHTML += `
      <div class="chat-bubble bot text-red-600">
        <strong>Error:</strong>
        <p>${error.message || "Something went wrong"}</p>
      </div>
    `;
  }
}

function clearChat() {
  document.getElementById("chatBox").innerHTML = "";
}
