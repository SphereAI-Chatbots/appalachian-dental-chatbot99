async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    document.getElementById("userInput").value = ""; // Clear input field

    try {
        let response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        let data = await response.json();
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    } catch (error) {
        console.error("Error:", error);
    }
}