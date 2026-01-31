# CodeLive - Real-time Code Editor

A professional-grade, browser-based code editor for HTML, CSS, and JavaScript with live preview capabilities. Built with vanilla JavaScript and CodeMirror, featuring modern glassmorphism UI design.

## Overview

CodeLive is an intermediate-level JavaScript project that demonstrates advanced web development concepts including real-time code execution, iframe communication, local storage persistence, and professional UI/UX design patterns.

## Key Features

**Core Functionality**
- Real-time live preview with automatic code execution
- Syntax highlighting powered by CodeMirror
- Integrated console with error capture
- Automatic code persistence via localStorage
- Multi-theme support (Dracula, Monokai, Material, Default)
- Horizontal and vertical layout options

**Developer Tools**
- Built-in template library with 6 starter projects
- Keyboard shortcuts (Ctrl/Cmd+S to save, Ctrl/Cmd+Enter to run)
- Line and column tracking
- Fullscreen preview mode
- Toggle auto-run functionality
- Console output capture for log, error, and warn

## Technical Implementation

### Technologies Used
- Vanilla JavaScript (ES6+)
- CodeMirror 5.65.2 (code editor library)
- HTML5 with iframe sandboxing
- CSS3 with glassmorphism effects
- LocalStorage API
- postMessage API for cross-origin communication

### Advanced Concepts Demonstrated
- Object-oriented programming with ES6 classes
- Event delegation and debouncing
- iframe security and sandboxing
- Cross-origin messaging
- Dynamic content injection
- Error handling and boundaries
- CSS custom properties and animations
- Responsive design patterns

## Project Structure

```
codelive/
├── index.html          # Application structure
├── styles.css          # Complete styling (glassmorphism design)
├── app.js             # Application logic (500+ lines)
└── README.md          # Documentation
```

## Installation

1. Download all project files
2. Open `index.html` in a modern web browser
3. Begin coding - no build process required

Note: Internet connection required for CodeMirror CDN.

## Usage

### Basic Workflow
1. Write code in the HTML, CSS, or JavaScript tabs
2. Preview updates automatically in real-time
3. Monitor console output for logs and errors
4. Code is automatically saved to browser storage

### Keyboard Shortcuts
- `Ctrl/Cmd + S`: Save code to localStorage
- `Ctrl/Cmd + Enter`: Manually trigger preview update

### Available Templates
- Blank: Empty starting point
- Basic HTML: Simple starter template
- Flexbox Layout: Modern CSS layout demonstration
- CSS Animation: Animated elements showcase
- Canvas Drawing: Interactive HTML5 canvas
- API Fetch: Asynchronous data fetching example

## Learning Objectives

This project serves as a comprehensive example of:
- Professional code editor integration
- Real-time preview implementation
- Secure iframe communication
- Client-side data persistence
- Modern UI/UX design patterns
- Performance optimization techniques
- Error handling strategies
- Responsive web design

## Browser Compatibility

Requires a modern browser with support for:
- ES6+ JavaScript features
- CSS backdrop-filter
- HTML5 iframe sandbox
- LocalStorage API
- postMessage API

Tested on Chrome, Firefox, Safari, and Edge (latest versions).

## Limitations

- Requires internet connection for CodeMirror CDN
- Limited to browser localStorage capacity (typically 5-10MB)
- Client-side execution only
- Single-user environment
- No server-side code execution

## Extension Ideas

- File export functionality (download HTML/CSS/JS)
- Code formatting and linting
- Multiple project tabs
- GitHub integration
- Collaborative editing
- Custom theme creation
- Snippet library
- Version history

## License

Open source - available for educational and personal use.

## Technical Notes

### Security
All preview code runs in a sandboxed iframe with restricted permissions:
- `allow-scripts`: JavaScript execution
- `allow-modals`: Alert/confirm dialogs
- `allow-forms`: Form submission
- `allow-popups`: Window.open
- `allow-same-origin`: LocalStorage access

### Performance
- Debounced updates (500ms delay) to prevent excessive rendering
- Efficient event delegation
- Optimized DOM manipulation
- CSS animations with hardware acceleration

### Code Organization
- Single-class architecture for maintainability
- Separation of concerns between UI and logic
- Modular template system
- Clear method naming conventions

## Credits

Built with CodeMirror text editor component. Inspired by CodePen and JSFiddle.
