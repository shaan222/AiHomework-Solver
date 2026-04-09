// Global variables
let currentUser = null;
let currentQuestion = null;

// OpenRouter API configuration - Real API key for production use
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_API_KEY = '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';

// App configuration
const APP_CONFIG = {
    version: '1.0.0',
    name: 'AI Homework Solver',
    description: 'Professional AI-powered homework assistance'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html' || currentPage === '') {
        initAuth();
    } else if (currentPage === 'dashboard.html') {
        initDashboard();
    }
});

// Authentication functions
function initAuth() {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    // Tab switching
    loginTab.addEventListener('click', () => switchTab('login'));
    signupTab.addEventListener('click', () => switchTab('signup'));

// Form submissions
loginBtn.addEventListener('click', handleLogin);
signupBtn.addEventListener('click', handleSignup);

// Prevent form submission on enter key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeTab = document.querySelector('.auth-form.active');
        if (activeTab) {
            e.preventDefault();
            if (activeTab.id === 'login-form') {
                handleLogin();
            } else {
                handleSignup();
            }
        }
    }
});

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('aiHomeworkUser'));
    if (user) {
        window.location.href = 'dashboard.html';
    }
}

function switchTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (tab === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('aiHomeworkUsers')) || [];

    if (users.length === 0) {
        showMessage('No accounts found. Please sign up first.', 'error');
        return;
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
        localStorage.setItem('aiHomeworkUser', JSON.stringify(user));
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showMessage('Invalid email or password', 'error');
    }
}

function handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Check password strength (minimum 6 characters)
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('aiHomeworkUsers')) || [];
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        showMessage('An account with this email already exists', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password, // In production, hash this password
        apiKey: DEFAULT_API_KEY,
        createdAt: new Date().toISOString(),
        history: []
    };

    users.push(newUser);
    localStorage.setItem('aiHomeworkUsers', JSON.stringify(users));
    localStorage.setItem('aiHomeworkUser', JSON.stringify(newUser));

    showMessage('Account created successfully! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 3000);
}

// Dashboard functions
function initDashboard() {
    const user = JSON.parse(localStorage.getItem('aiHomeworkUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    currentUser = user;

    // Update UI
    document.getElementById('user-name').textContent = user.name;

    // Initialize components
    initNavigation();
    initQuestionInput();
    initHistory();
    initSettings();

    // Load initial history
    loadHistory();
}

function initNavigation() {
    const newQuestionBtn = document.getElementById('new-question-btn');
    const historyBtn = document.getElementById('history-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const logoutBtn = document.getElementById('logout-btn');

    newQuestionBtn.addEventListener('click', () => switchSection('new-question'));
    historyBtn.addEventListener('click', () => switchSection('history'));
    settingsBtn.addEventListener('click', () => switchSection('settings'));
    logoutBtn.addEventListener('click', handleLogout);
}

function switchSection(section) {
    // Update sidebar buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${section}-btn`).classList.add('active');

    // Update content sections
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}-section`).classList.add('active');
}

function handleLogout() {
    localStorage.removeItem('aiHomeworkUser');
    window.location.href = 'index.html';
}

function initQuestionInput() {
    const textTab = document.getElementById('text-tab');
    const uploadTab = document.getElementById('upload-tab');
    const solveBtn = document.getElementById('solve-btn');
    const saveBtn = document.getElementById('save-solution-btn');
    const copyBtn = document.getElementById('copy-solution-btn');

    textTab.addEventListener('click', () => switchInputTab('text'));
    uploadTab.addEventListener('click', () => switchInputTab('upload'));
    solveBtn.addEventListener('click', handleSolveQuestion);
    saveBtn.addEventListener('click', handleSaveSolution);
    copyBtn.addEventListener('click', handleCopySolution);

    // Image upload
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
}

function switchInputTab(tab) {
    document.querySelectorAll('.input-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tab}-tab`).classList.add('active');

    document.querySelectorAll('.input-area').forEach(area => area.classList.remove('active'));
    document.getElementById(`${tab}-input`).classList.add('active');
}

// Enhanced switch function that ensures proper UI updates
function switchToTextTab() {
    switchInputTab('text');
    // Focus on the text area to show extracted text
    setTimeout(() => {
        document.getElementById('question-text').focus();
        document.getElementById('question-text').scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showModalMessage('Please select a valid image file (PNG, JPG, JPEG, etc.)');
            event.target.value = ''; // Clear the input
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showModalMessage('Image size must be less than 10MB');
            event.target.value = ''; // Clear the input
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = `
                <div class="image-preview-container">
                    <img src="${e.target.result}" alt="Uploaded question" class="uploaded-image">
                    <div class="image-info">
                        <i class="fas fa-check-circle"></i>
                        <span>Image ready for processing</span>
                    </div>
                </div>
            `;

            // Add smooth animation
            setTimeout(() => {
                preview.querySelector('.uploaded-image').style.opacity = '1';
                preview.querySelector('.image-info').style.opacity = '1';
            }, 100);
        };
        reader.readAsDataURL(file);
    }
}

async function handleSolveQuestion() {
    const textTab = document.getElementById('text-tab');
    const questionText = document.getElementById('question-text');
    const subject = document.getElementById('subject-select').value;
    const imageUpload = document.getElementById('image-upload').files[0];
    const solveBtn = document.getElementById('solve-btn');

    let question = '';
    let hasImage = false;

    if (textTab.classList.contains('active')) {
        if (!questionText.value.trim()) {
            showModalMessage('Please enter a question');
            return;
        }
        question = questionText.value.trim();
    } else {
        if (!imageUpload) {
            showModalMessage('Please upload an image first');
            return;
        }

        // Disable button and show OCR loading state
        solveBtn.disabled = true;
        solveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Image...';

        // Show loading modal
        showLoading(true, 'Analyzing image and extracting text...');

        try {
            // Extract text from image using OCR
            const extractedText = await extractTextFromImage(imageUpload);
            if (!extractedText.trim()) {
                throw new Error('Could not extract readable text from the image. Please try a clearer image or type the question manually.');
            }

            // Show extracted text in the input area
            questionText.value = extractedText.trim();
            switchToTextTab(); // Switch to text tab to show extracted text

            // Update loading message
            updateLoadingMessage('Processing with AI...');

            question = extractedText.trim();
            hasImage = true;

        } catch (error) {
            console.error('OCR Error:', error);
            showModalMessage(error.message || 'Failed to process image. Please try again.');
            // Reset button state on error
            solveBtn.disabled = false;
            solveBtn.innerHTML = '<i class="fas fa-magic"></i> Solve Question';
            showLoading(false);
            return;
        }
    }

    // If we get here, we have a question to solve
    try {
        const solution = await getAISolution(question, subject);
        const formattedSolution = formatSolutionForSubject(solution, subject);
        displaySolution(formattedSolution);
        currentQuestion = {
            question,
            subject,
            solution: formattedSolution,
            timestamp: new Date().toISOString(),
            hasImage
        };
    } catch (error) {
        console.error('AI Solution Error:', error);
        showModalMessage('Error getting solution: ' + (error.message || 'Unknown error occurred'));
    } finally {
        // Reset button state
        solveBtn.disabled = false;
        solveBtn.innerHTML = '<i class="fas fa-magic"></i> Solve Question';
        showLoading(false);
    }
}

// OCR function using Tesseract.js
async function extractTextFromImage(imageFile) {
    try {
        const result = await Tesseract.recognize(imageFile, 'eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    updateLoadingMessage(`Analyzing image... ${Math.round(m.progress * 100)}%`);
                }
            }
        });

        const extractedText = result.data.text;
        if (!extractedText || extractedText.trim().length < 3) {
            throw new Error('No readable text found in the image. Please ensure the image contains clear, legible text.');
        }

        return extractedText;
    } catch (error) {
        console.error('Tesseract OCR Error:', error);
        if (error.message.includes('No readable text')) {
            throw error;
        }
        throw new Error('Failed to process the image. Please try a different image or type the question manually.');
    }
}

async function getAISolution(question, subject) {
    const apiKey = DEFAULT_API_KEY; // Use the hardcoded API key

    let systemPrompt = getSubjectPrompt(subject);

    let messages = [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: question
        }
    ];

    try {
        const response = await fetch(OPENROUTER_BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'AI Homework Solver'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3-haiku',
                messages: messages,
                max_tokens: 2500,
                temperature: 0.3 // Lower temperature for more accurate solutions
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenRouter API key.');
            } else if (response.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else if (response.status === 400) {
                throw new Error('Invalid request. Please check your question format.');
            } else {
                throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
            }
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from AI service');
        }

        return data.choices[0].message.content;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error: Please check your internet connection');
        }
        throw error;
    }
}

function getSubjectPrompt(subject) {
    return `You are a strict math teacher.

Solve this problem step-by-step:

STRICT RULES:
- Only short steps
- No explanations
- No theory
- No repetition

FORMAT:
Step 1:
Step 2:
Step 3:

Final Answer: <answer>`;
}

function displaySolution(solution) {
    const solutionArea = document.getElementById('solution-area');
    const solutionContent = document.getElementById('solution-content');

    solutionContent.innerHTML = formatSolution(solution);
    solutionArea.style.display = 'block';

    // Scroll to solution
    solutionArea.scrollIntoView({ behavior: 'smooth' });
}

function formatSolutionForSubject(solution, subject) {
    let formatted = solution;

    // Clean up the response first
    formatted = formatted.trim();

    // Handle code blocks
    formatted = formatted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="code-block"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
    });

    // Handle inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Format Step patterns - clean and simple
    formatted = formatted.replace(/^(?:Step\s*)?(\d+)[:.]?\s*(.+)$/gm, (match, num, content) => {
        return `<div class="step">Step ${num}: ${content.trim()}</div>`;
    });

    // Handle alternative step formats
    formatted = formatted.replace(/^(\d+)\.\s*(.+)$/gm, (match, num, content) => {
        return `<div class="step">Step ${num}: ${content.trim()}</div>`;
    });

    // Highlight final answer
    formatted = formatted.replace(/(?:Final Answer|Answer)[:.]?\s*(.+?)(?:\n|$)/i,
        '<div class="final-answer">Final Answer: $1</div>');

    // Clean up line breaks and spacing
    formatted = formatted.replace(/\n\s*\n/g, '\n');
    formatted = formatted.replace(/\n/g, '<br>');

    // Remove any remaining step markers that weren't caught
    formatted = formatted.replace(/Step\s*\d+[:.]?\s*/gi, '');

    return formatted;
}

// Keep the old function for backward compatibility
function formatSolution(solution) {
    return formatSolutionForSubject(solution, 'other');
}

function handleSaveSolution() {
    if (!currentQuestion) {
        showModalMessage('No solution to save');
        return;
    }

    currentUser.history.unshift(currentQuestion);
    updateUserData();

    showModalMessage('Solution saved to history!');
    loadHistory();
}

async function handleCopySolution() {
    const solutionContent = document.getElementById('solution-content');
    if (!solutionContent || !solutionContent.textContent.trim()) {
        showModalMessage('No solution to copy');
        return;
    }

    const copyBtn = document.getElementById('copy-solution-btn');

    try {
        await navigator.clipboard.writeText(solutionContent.textContent);
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('success');

        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (error) {
        console.error('Copy failed:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = solutionContent.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('success');

        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.classList.remove('success');
        }, 2000);
    }
}

function initHistory() {
    // History is loaded in loadHistory()
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (currentUser.history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #718096; padding: 40px;">No questions solved yet. Start by asking a question!</p>';
        return;
    }

    currentUser.history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-item-header">
                <div>
                    <div class="history-item-title">${item.question.length > 100 ? item.question.substring(0, 100) + '...' : item.question}</div>
                    <div class="history-item-meta">${item.subject} • ${new Date(item.timestamp).toLocaleDateString()}</div>
                </div>
                <div class="history-item-actions">
                    <button onclick="viewSolution(${index})" class="btn-secondary">View</button>
                    <button onclick="deleteHistoryItem(${index})" class="btn-danger">Delete</button>
                </div>
            </div>
            <div class="history-item-content" id="solution-${index}" style="display: none;">
                ${formatSolution(item.solution)}
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

function viewSolution(index) {
    const solutionDiv = document.getElementById(`solution-${index}`);
    const isVisible = solutionDiv.style.display === 'block';
    solutionDiv.style.display = isVisible ? 'none' : 'block';
}

function deleteHistoryItem(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        currentUser.history.splice(index, 1);
        updateUserData();
        loadHistory();
    }
}

function initSettings() {
    const deleteBtn = document.getElementById('delete-account-btn');

    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            deleteAccount();
        }
    });
}

function updateUserData() {
    const users = JSON.parse(localStorage.getItem('aiHomeworkUsers')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    users[userIndex] = currentUser;
    localStorage.setItem('aiHomeworkUsers', JSON.stringify(users));
    localStorage.setItem('aiHomeworkUser', JSON.stringify(currentUser));
}

function deleteAccount() {
    const users = JSON.parse(localStorage.getItem('aiHomeworkUsers')) || [];
    const updatedUsers = users.filter(u => u.id !== currentUser.id);
    localStorage.setItem('aiHomeworkUsers', JSON.stringify(updatedUsers));
    localStorage.removeItem('aiHomeworkUser');
    window.location.href = 'index.html';
}

// Utility functions
function showLoading(show, customMessage = null) {
    const modal = document.getElementById('loading-modal');
    const content = modal.querySelector('p');

    if (show) {
        modal.classList.add('show');

        if (customMessage) {
            // Use custom message
            if (content) content.textContent = customMessage;
        } else {
            // Cycle through different messages for better UX
            const messages = [
                'Analyzing your question...',
                'Processing with AI...',
                'Generating solution...'
            ];
            let currentIndex = 0;

            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % messages.length;
                if (content) content.textContent = messages[currentIndex];
            }, 1500);

            modal.dataset.intervalId = interval;
        }
    } else {
        modal.classList.remove('show');
        const intervalId = modal.dataset.intervalId;
        if (intervalId) {
            clearInterval(intervalId);
            delete modal.dataset.intervalId;
        }
        if (content) content.textContent = 'Analyzing your question...';
    }
}

function updateLoadingMessage(message) {
    const modal = document.getElementById('loading-modal');
    const content = modal.querySelector('p');

    if (content && modal.classList.contains('show')) {
        // Clear any cycling interval
        const intervalId = modal.dataset.intervalId;
        if (intervalId) {
            clearInterval(intervalId);
            delete modal.dataset.intervalId;
        }

        content.textContent = message;
    }
}

function showModalMessage(message) {
    const modal = document.getElementById('message-modal');
    const content = document.getElementById('message-content');
    const closeBtn = document.getElementById('message-close-btn');

    content.textContent = message;
    modal.classList.add('show');

    closeBtn.onclick = () => modal.classList.remove('show');
}

// Error handling for API calls
window.addEventListener('unhandledrejection', event => {
    console.error('API Error:', event.reason);
    showModalMessage('An error occurred while processing your request. Please check your API key and try again.');
});