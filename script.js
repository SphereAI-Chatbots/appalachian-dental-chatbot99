async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("userInput").value = "";
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON: ${text}`);
      }
  
      const data = await response.json();
      chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.error("Error:", error);
      chatBox.innerHTML += `<p><strong>Error:</strong> ${error.message}</p>`;
    }
  }
  