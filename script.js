try {
    let response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });
  
    let data;
    if (response.ok) {
      data = await response.json();
      chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
    } else {
      const errorText = await response.text();
      chatBox.innerHTML += `<p><strong>Error:</strong> ${errorText}</p>`;
    }
  
    chatBox.scrollTop = chatBox.scrollHeight;
  
  } catch (error) {
    console.error("Error:", error);
  }
  