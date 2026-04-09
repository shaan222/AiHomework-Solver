# 🤖 AI Homework Solver

<div align="center">
  <img src="AI homework solver logo design.png" alt="AI Homework Solver Logo" width="200" height="200">

  <h3>Revolutionary AI-Powered Homework Assistance</h3>
  <p>Get instant, step-by-step solutions to your academic problems with advanced AI technology</p>

  ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![OpenRouter](https://img.shields.io/badge/OpenRouter-%23FF6B35.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjIwQzE0IDIxLjEgMTMuMSAyMiAxMiAyMkw0IDIyQzIuOSAyMiAyIDIxLjEgMiAyMFYyQzIgMi45IDIuOSAyIDQgMkgxMEMxMS4xIDIgMTIgMi45IDEyIDJaIiBmaWxsPSIjRkY2QjM1Ii8+Cjwvc3ZnPgo=)

</div>

---

## 🌟 Overview

AI Homework Solver is a cutting-edge web application that leverages advanced artificial intelligence to provide instant, step-by-step solutions to academic problems. Whether you're struggling with mathematics, physics, chemistry, or other subjects, our AI-powered tutor delivers accurate, detailed explanations in real-time.

### ✨ Key Features

- **🔐 Secure Authentication**: User registration and login system with localStorage
- **📝 Multiple Input Methods**: Type questions or upload images with OCR technology
- **🧠 AI-Powered Solutions**: Step-by-step explanations using Claude-3 AI model
- **📚 Multi-Subject Support**: Mathematics, Physics, Chemistry, Biology, Computer Science, and more
- **💾 History Management**: Save and revisit previous solutions
- **📋 Copy Solutions**: One-click copy to clipboard
- **📱 Responsive Design**: Works seamlessly on all devices
- **🎨 Modern UI**: Glassmorphism design with smooth animations

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI API calls
- [OpenRouter API Key](https://openrouter.ai/keys) (free tier available)

### Installation

1. **Clone or Download**
   ```bash
   # Download the project files to your local machine
   # Extract the files to your web server directory
   ```

2. **Open in Browser**
   ```
   Simply open index.html in your web browser
   No server setup required!
   ```

3. **First Time Setup**
   - Open `index.html`
   - Click "Sign Up"
   - Create your account
   - The app will guide you through the setup process

---

## 🎯 How to Use

### 1. Account Setup
- **Sign Up**: Create a new account with email and password
- **Login**: Access your existing account
- **Session Management**: Your login persists across browser sessions

### 2. Asking Questions

#### Text Input Method:
1. Navigate to the "New Question" section
2. Select your subject from the dropdown
3. Type your question in the text area
4. Click "Solve Question"
5. Wait for AI processing (shows loading animation)
6. View step-by-step solution

#### Image Upload Method:
1. Click the "Upload Image" tab
2. Select an image file (PNG, JPG, JPEG under 10MB)
3. The app automatically extracts text using OCR
4. Review and edit the extracted text if needed
5. Click "Solve Question"
6. Get AI-powered solution

### 3. Managing Solutions

#### History Feature:
- All solved questions are automatically saved
- Access via "History" tab in sidebar
- Click "View" to reload any previous solution
- Click "Delete" to remove unwanted items

#### Copy Solutions:
- Click the "Copy" button on any solution
- Solution text is copied to your clipboard
- Shows "Copied!" confirmation

---

## 🛠️ Technical Architecture

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript (ES6+)**: Interactive functionality and API integration

### Key Libraries & APIs
- **Tesseract.js**: Optical Character Recognition for image processing
- **OpenRouter API**: AI model access (Claude-3-Haiku)
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter font family)

### AI Integration
- **Model**: Anthropic Claude-3-Haiku
- **API**: OpenRouter (unified AI model access)
- **Prompt Engineering**: Subject-specific prompts for accurate solutions
- **Rate Limiting**: Built-in request throttling

### Security Features
- **Client-Side Storage**: User data stored securely in localStorage
- **Input Validation**: Email format and password strength checking
- **API Key Protection**: Secure handling of authentication tokens

---

## 📁 Project Structure

```
AI Homework Solver/
├── index.html              # Login/Signup page
├── dashboard.html          # Main application interface
├── style.css              # Complete styling and animations
├── script.js              # Application logic and API integration
├── AI homework solver logo design.png  # Project logo
└── README.md              # This documentation
```

---

## 🎨 Design Philosophy

### UI/UX Principles
- **Minimalist Design**: Clean, uncluttered interface
- **Dark Theme**: Professional appearance with eye comfort
- **Glassmorphism**: Modern backdrop blur effects
- **Micro-Interactions**: Smooth animations and feedback
- **Accessibility**: Proper contrast ratios and keyboard navigation

### Color Palette
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Pink accent (#f093fb)
- **Background**: Dark theme (#0a0a0a)
- **Text**: Light colors for readability

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure
- **Readability**: Optimized line heights and spacing

---

## 🔧 Configuration

### API Setup
The application uses OpenRouter API for AI functionality. Your API key is stored locally and never sent to external servers.

### Customization Options
- **Subject Categories**: Easily extensible for new subjects
- **UI Themes**: Dark theme with potential for light mode
- **Language Support**: Currently English, expandable to other languages

---

## 📱 Responsive Features

### Mobile Optimization
- **Touch-Friendly**: Large buttons and touch targets
- **Adaptive Layout**: Single-column layout on mobile devices
- **Hamburger Menu**: Collapsible navigation for small screens
- **Optimized Images**: Fast loading with proper sizing

### Cross-Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Works with JavaScript disabled
- **Fallback Support**: Graceful degradation for older browsers

---

## 🐛 Troubleshooting

### Common Issues

**"Image processing is not implemented" Error:**
- This error has been fixed in the latest version
- If you encounter it, refresh the page and try again

**"API request failed" Error:**
- Check your internet connection
- Verify your OpenRouter API key is valid
- Ensure you haven't exceeded rate limits

**Login Issues:**
- Clear browser cache and cookies
- Try signing up again if account issues persist

**OCR Not Working:**
- Ensure image is clear and contains legible text
- Try images with higher contrast
- Maximum file size: 10MB

---

## 🚀 Future Enhancements

### Planned Features
- **Voice Input**: Speak your questions
- **Multi-Language Support**: Solutions in different languages
- **Collaborative Learning**: Share solutions with classmates
- **Progress Tracking**: Learning analytics and insights
- **Offline Mode**: Limited functionality without internet

### Technical Improvements
- **PWA Support**: Installable web app
- **Real-time Collaboration**: Multi-user problem solving
- **Advanced OCR**: Better handwriting recognition
- **Custom AI Models**: Fine-tuned for education

---

## 🤝 Contributing

We welcome contributions to improve AI Homework Solver!

### Ways to Contribute
1. **Bug Reports**: Report issues on GitHub
2. **Feature Requests**: Suggest new functionality
3. **Code Contributions**: Submit pull requests
4. **Documentation**: Help improve this README

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Anthropic**: For the Claude AI model
- **OpenRouter**: For unified AI API access
- **Tesseract.js**: For OCR functionality
- **Font Awesome**: For beautiful icons
- **Google Fonts**: For typography

---

## 📞 Support

Need help? Here's how to get support:

- **Documentation**: Check this README first
- **Community**: Join our Discord server
- **Email**: stoneplayz36@gmail.com
- **Issues**: Report bugs on GitHub

---

<div align="center">

**Built with ❤️ for students worldwide**

*Transforming education through AI-powered learning*

---

**[🚀 Try AI Homework Solver Now](#)** | **[📖 View Documentation](#)** | **[🐛 Report Issues](#)**

</div>
