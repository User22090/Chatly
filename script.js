document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");

    // Form submission interceptor
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const messageText = userInput.value.trim();
        if (!messageText) return;

        // 1. Render User Message immediately in the UI
        appendMessage(messageText, "user");
        userInput.value = ""; // Clear input

        // 2. Add temporary "typing..." animation for the bot
        const typingIndicatorElement = appendTypingIndicator();

        try {
            // 3. Fire the request to the Arjit & Vaibhav backend integration function
            const botResponse = await sendMessageToBackend(messageText);
            
            // Remove typing indicator and append the official response
            typingIndicatorElement.remove();
            appendMessage(botResponse, "bot");
        } catch (error) {
            console.error("Integration Error:", error);
            typingIndicatorElement.remove();
            appendMessage("Sorry, I'm having trouble connecting to my brain right now.", "bot");
        }
    });

    // Helper: Appends HTML message components to feed
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", `${sender}-message`);

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-content">${escapeHTML(text)}</div>
            <span class="timestamp">${time}</span>
        `;

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Helper: Appends typing indicator
    function appendTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.classList.add("message", "bot-message");
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots"><span></span><span></span><span></span></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        return typingDiv;
    }

    // Helper: Auto-scrolling
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Helper: Prevent XSS exploits if injecting standard text string strings
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    /* ==========================================================================
       BACKEND INTEGRATION PLACEHOLDER (For Arjit & Vaibhav)
       ========================================================================== */
    async function sendMessageToBackend(userPrompt) {
        /**
         * TODO: Arjit & Vaibhav - Hook up your API here.
         * Example standard fetch setup:
         * * const response = await fetch("https://your-backend-api.com/chat", {
         * method: "POST",
         * headers: { "Content-Type": "application/json" },
         * body: JSON.stringify({ message: userPrompt })
         * });
         * const data = await response.json();
         * return data.reply; // return the text string back
         */

        // Mock delay to simulate a real server processing time (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock server response for testing
        return `You said: "${userPrompt}". I am currently running on local development mode. Plug in the production API inside app.js!`;
    }
});