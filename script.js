async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatBox = document.getElementById("chatBox");
  
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("userInput").value = ""; // Clear input field
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const data = await response.json();
      chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      chatBox.innerHTML += `<p><strong>Error:</strong> Something went wrong.</p>`;
      console.error("Error:", error);
    }
  }
  