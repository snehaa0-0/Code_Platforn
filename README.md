# CodeLive - Real-time Code Editor 🚀

A professional, feature-rich code editor built with vanilla JavaScript, similar to CodePen. Perfect for intermediate developers learning advanced web development concepts.

![CodeLive Editor](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![HTML5](https://img.shields.io/badge/HTML-5-orange) ![CSS3](https://img.shields.io/badge/CSS-3-blue)

## ✨ Features

### Core Functionality
- **Live Preview**: Real-time rendering of HTML, CSS, and JavaScript
- **Syntax Highlighting**: Powered by CodeMirror with multiple themes
- **Auto-run Mode**: Automatically updates preview as you type (toggleable)
- **Console Integration**: Captures console.log, console.error, and console.warn
- **Local Storage**: Automatically saves your work
- **Multi-theme Support**: Dracula, Monokai, Material, and Default themes
- **Layout Switching**: Horizontal and vertical layout options

### Advanced Features
- **Template Library**: 6 pre-built templates to get started quickly
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + S`: Save code
  - `Ctrl/Cmd + Enter`: Run code
- **Error Handling**: Catches and displays JavaScript errors in console
- **Line/Column Counter**: Shows current cursor position and total lines
- **Fullscreen Preview**: Expand preview to fullscreen
- **Code Persistence**: Never lose your work with automatic localStorage saving

### Developer Tools
- **Tab Switching**: Seamless switching between HTML, CSS, and JS
- **Clear Functions**: Clear individual editors or all code
- **Refresh Preview**: Manual preview refresh option
- **Console Toggle**: Show/hide console panel
- **Export/Import**: Save and load your code

## 🎯 Learning Objectives

This project demonstrates:

1. **CodeMirror Integration**: Professional code editor library
2. **iframe Communication**: postMessage API for cross-origin messaging
3. **Local Storage API**: Persistent data storage
4. **Event Delegation**: Efficient event handling
5. **Debouncing**: Performance optimization for auto-run
6. **Object-Oriented Programming**: Clean class-based architecture
7. **Dynamic Content Generation**: Real-time HTML injection
8. **Error Handling**: Try-catch blocks and error boundaries
9. **Keyboard Events**: Custom keyboard shortcuts
10. **CSS Animations**: Smooth transitions and animations
11. **Responsive Design**: Mobile-friendly layouts
12. **Template System**: Reusable code templates

## 🛠️ Technologies Used

- **Vanilla JavaScript (ES6+)**: Classes, arrow functions, async/await, destructuring
- **CodeMirror 5.65.2**: Professional code editor component
- **HTML5**: Semantic markup and iframe sandboxing
- **CSS3**: Flexbox, Grid, animations, custom properties
- **LocalStorage API**: Client-side data persistence
- **postMessage API**: Secure cross-origin communication

## 📦 Project Structure

```
codelive/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── app.js             # Application logic (500+ lines)
└── README.md          # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript
- Internet connection (for CodeMirror CDN)

### Installation

1. Download all project files:
   - `index.html`
   - `styles.css`
   - `app.js`

2. Open `index.html` in your web browser

3. Start coding! Your work is automatically saved.

## 📖 How to Use

### Basic Workflow
1. **Write Code**: Use the HTML, CSS, and JS tabs to write your code
2. **See Results**: Watch the live preview update in real-time
3. **Debug**: Check the console for logs and errors
4. **Save**: Your code is auto-saved to localStorage

### Features Guide

#### Switching Tabs
- Click on HTML, CSS, or JS tabs to switch editors
- Visual indicator shows which tab is active

#### Themes
- Select from dropdown: Dracula, Monokai, Material, or Default
- Theme applies to all three editors

#### Layout
- **Horizontal**: Editors on left, preview on right
- **Vertical**: Editors on top, preview on bottom

#### Templates
1. Click "Load" button in header
2. Choose from 6 templates:
   - **Blank**: Empty canvas
   - **Basic HTML**: Simple starter
   - **Flexbox Layout**: Modern CSS layout
   - **CSS Animation**: Animated elements
   - **Canvas Drawing**: Interactive canvas
   - **API Fetch**: Async data fetching

#### Console
- Click "Console" button to show/hide
- Automatically captures:
  - `console.log()` - Blue border
  - `console.error()` - Red border
  - `console.warn()` - Yellow border

#### Keyboard Shortcuts
- `Ctrl/Cmd + S`: Save your code
- `Ctrl/Cmd + Enter`: Run code manually

## 🎨 Templates Included

### 1. Basic HTML
Simple HTML structure with styling and interactivity

### 2. Flexbox Layout
Modern responsive layout using flexbox

### 3. CSS Animation
Multiple CSS animations (bounce, rotate, pulse)

### 4. Canvas Drawing
Interactive HTML5 canvas with drawing functionality

### 5. API Fetch
Fetches data from Random User API and displays it

### 6. Blank
Start from scratch with no template

## 💡 Advanced Concepts Explained

### 1. iframe Sandbox
```javascript
<iframe sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin">
```
- Isolates preview code for security
- Prevents malicious code from affecting parent page

### 2. Console Capture
```javascript
console.log = function(...args) {
    window.parent.postMessage({
        type: 'console',
        method: 'log',
        args: args
    }, '*');
};
```
- Intercepts console methods
- Sends messages to parent window
- Displays in custom console panel

### 3. Debouncing
```javascript
clearTimeout(this.updateTimeout);
this.updateTimeout = setTimeout(() => {
    this.updatePreview();
}, this.updateDelay);
```
- Prevents excessive preview updates
- Improves performance
- Updates only after user stops typing

### 4. Dynamic iframe Content
```javascript
preview.srcdoc = `<!DOCTYPE html>...`;
```
- Injects HTML, CSS, and JS into iframe
- Creates isolated execution environment
- Enables real-time preview

## 🎓 What You'll Learn

### JavaScript Concepts
- Class-based architecture
- Event handling and delegation
- Async/await for API calls
- LocalStorage API
- postMessage API
- Error handling
- Debouncing technique
- Template literals

### HTML/CSS Concepts
- Semantic HTML5
- CSS Grid and Flexbox
- CSS animations
- Custom properties (CSS variables)
- Responsive design
- iframe security

### Software Engineering
- Code organization
- Separation of concerns
- State management
- Error boundaries
- Performance optimization
- User experience design

## 🔧 Customization Ideas

Enhance this project by adding:

1. **File Management**: Download HTML/CSS/JS files
2. **Code Beautification**: Format code automatically
3. **Linting**: ESLint integration
4. **Version Control**: Save multiple versions
5. **Collaboration**: Share code via URL
6. **More Templates**: Add your own templates
7. **Settings Panel**: Font size, tab width, etc.
8. **Dark/Light Mode**: Toggle UI theme
9. **External Libraries**: Load jQuery, React, etc.
10. **Code Snippets**: Reusable code fragments
11. **Screenshot Tool**: Capture preview as image
12. **GitHub Integration**: Push to GitHub
13. **Multiple Tabs**: Work on multiple projects
14. **Emmet Support**: Abbreviation expansion
15. **Autocomplete**: IntelliSense-like features

## 🐛 Known Limitations

- Requires internet connection (CodeMirror CDN)
- Limited to browser localStorage (5-10MB)
- No server-side code execution
- No file system access
- Single user only
- No real-time collaboration

## 📝 Code Highlights

### Auto-save Implementation
```javascript
handleCodeChange() {
    this.saveToStorage();
    if (this.autoRun) {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, this.updateDelay);
    }
}
```

### Console Integration
```javascript
window.addEventListener('message', (e) => {
    if (e.data.type === 'console') {
        codeEditor.addConsoleMessage(e.data.method, e.data.args);
    }
});
```

### Keyboard Shortcuts
```javascript
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveToStorage();
    }
});
```

## 🎯 Target Audience

This project is perfect for:
- Intermediate JavaScript developers
- Students learning web development
- Developers building a portfolio
- Anyone interested in code editors
- Teaching tool for instructors

## 🤝 Contributing

Ideas for contributions:
- Add more templates
- Improve error handling
- Add unit tests
- Create better mobile experience
- Add more keyboard shortcuts
- Implement code snippets
- Add export functionality

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- **CodeMirror**: Excellent code editor library
- **Dracula Theme**: Beautiful color scheme
- Inspired by CodePen, JSFiddle, and similar tools

## 📧 Support

If you encounter issues or have questions:
1. Check the browser console for errors
2. Verify internet connection (for CodeMirror)
3. Try clearing localStorage
4. Use a modern browser

---

**Built with ❤️ for learning and teaching web development**

## 🎉 Quick Start Example

Try this in the editor:

**HTML:**
```html
<h1>Hello CodeLive!</h1>
<button onclick="changeColor()">Click Me</button>
```

**CSS:**
```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial;
}

button {
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
}
```

**JavaScript:**
```javascript
function changeColor() {
  document.body.style.background = 
    '#' + Math.floor(Math.random()*16777215).toString(16);
}
```

**Happy Coding! 🚀**
