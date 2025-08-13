document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendBtn = document.querySelector('.send-btn');
    const typingIndicator = document.getElementById('typingIndicator');

    // Initialize voice button if needed
    initVoiceInput();

    // Handle form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (!message) return;

        // Add user message to chat
        addMessageToChat(message, 'user');
        userInput.value = '';
        
        // Show loading state
        setLoadingState(true);
        
        // Send message to backend
        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message})
        })
        .then(handleResponse)
        .catch(handleError)
        .finally(() => {
            setLoadingState(false);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });

    // Handle suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(button => {
        button.addEventListener('click', function() {
            userInput.value = this.textContent;
            userInput.focus();
        });
    });

    // Helper functions
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'bot' 
            ? '<i class="fas fa-robot"></i>' 
            : '<i class="fas fa-user"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            typingIndicator.style.display = 'flex';
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        } else {
            typingIndicator.style.display = 'none';
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json().then(data => {
            addMessageToChat(data.response, 'bot');
        });
    }

    function handleError(error) {
        console.error('Chatbot error:', error);
        addMessageToChat("Sorry, I'm having trouble responding. Please try again.", 'bot');
    }

    function initVoiceInput() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.title = 'Voice Input';
        voiceBtn.type = 'button'; // Prevent form submission
        
        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            chatInput.style.position = 'relative';
            voiceBtn.style.position = 'absolute';
            voiceBtn.style.right = '70px';
            voiceBtn.style.top = '50%';
            voiceBtn.style.transform = 'translateY(-50%)';
            voiceBtn.style.background = 'none';
            voiceBtn.style.border = 'none';
            voiceBtn.style.color = 'var(--gray-color)';
            voiceBtn.style.cursor = 'pointer';
            voiceBtn.style.fontSize = '1.2rem';
            
            voiceBtn.addEventListener('mouseenter', function() {
                this.style.color = 'var(--primary-color)';
            });
            
            voiceBtn.addEventListener('mouseleave', function() {
                this.style.color = 'var(--gray-color)';
            });
            
            voiceBtn.addEventListener('click', function() {
                if (!('webkitSpeechRecognition' in window)) {
                    addMessageToChat('Voice recognition is not supported in your browser', 'bot');
                    return;
                }
                
                const recognition = new webkitSpeechRecognition();
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                
                recognition.onstart = function() {
                    voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                    voiceBtn.style.color = 'var(--warning-color)';
                    setLoadingState(true);
                };
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    userInput.value = transcript;
                    // Auto-submit if desired
                    // chatForm.dispatchEvent(new Event('submit'));
                };
                
                recognition.onerror = function(event) {
                    console.error('Speech recognition error', event.error);
                    addMessageToChat('Voice input failed: ' + event.error, 'bot');
                };
                
                recognition.onend = function() {
                    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                    voiceBtn.style.color = 'var(--gray-color)';
                    setLoadingState(false);
                };
                
                recognition.start();
            });
            
            chatInput.appendChild(voiceBtn);
        }
    }
});