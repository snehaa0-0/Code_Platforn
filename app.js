// Code Editor Application
class CodeEditor {
    constructor() {
        this.editors = {};
        this.currentTab = 'html';
        this.autoRun = true;
        this.updateDelay = 500;
        this.updateTimeout = null;
        
        this.init();
    }

    init() {
        this.initEditors();
        this.initEventListeners();
        this.loadFromStorage();
        this.updatePreview();
    }

    // Initialize CodeMirror editors
    initEditors() {
        const editorConfig = {
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            autoCloseTags: true,
            lineWrapping: true,
            theme: 'dracula',
            indentUnit: 2,
            tabSize: 2,
            indentWithTabs: false
        };

        // HTML Editor
        this.editors.html = CodeMirror(document.getElementById('htmlEditor'), {
            ...editorConfig,
            mode: 'htmlmixed',
            value: ''
        });

        // CSS Editor
        this.editors.css = CodeMirror(document.getElementById('cssEditor'), {
            ...editorConfig,
            mode: 'css',
            value: ''
        });

        // JavaScript Editor
        this.editors.js = CodeMirror(document.getElementById('jsEditor'), {
            ...editorConfig,
            mode: 'javascript',
            value: ''
        });

        // Add change listeners
        Object.keys(this.editors).forEach(key => {
            this.editors[key].on('change', () => {
                this.handleCodeChange();
            });

            this.editors[key].on('cursorActivity', () => {
                this.updateLineCount();
            });
        });

        this.updateLineCount();
    }

    // Event Listeners
    initEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.tab').dataset.tab);
            });
        });

        // Theme selector
        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });

        // Layout selector
        document.getElementById('layoutSelect').addEventListener('change', (e) => {
            this.changeLayout(e.target.value);
        });

        // Run button
        document.getElementById('runBtn').addEventListener('click', () => {
            this.updatePreview();
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearCode();
        });

        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveToStorage();
        });

        // Load button
        document.getElementById('loadBtn').addEventListener('click', () => {
            this.openTemplatesModal();
        });

        // Auto-run toggle
        document.getElementById('autoRun').addEventListener('change', (e) => {
            this.autoRun = e.target.checked;
            if (this.autoRun) {
                this.updatePreview();
            }
        });

        // Console toggle
        document.getElementById('consoleToggle').addEventListener('click', () => {
            this.toggleConsole();
        });

        // Clear console
        document.getElementById('clearConsole').addEventListener('click', () => {
            this.clearConsole();
        });

        // Refresh preview
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.updatePreview();
        });

        // Fullscreen toggle
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeTemplatesModal();
        });

        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.target.closest('.template-card').dataset.template;
                this.loadTemplate(template);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveToStorage();
            }
            // Ctrl/Cmd + Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.updatePreview();
            }
        });
    }

    // Switch between editor tabs
    switchTab(tab) {
        if (this.currentTab === tab) return;

        this.currentTab = tab;

        // Update tab active states
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
            if (t.dataset.tab === tab) {
                t.classList.add('active');
            }
        });

        // Update editor visibility
        document.querySelectorAll('.editor').forEach(e => {
            e.classList.remove('active');
        });
        document.getElementById(`${tab}Editor`).classList.add('active');

        // Update tab indicator
        const activeTab = document.querySelector('.tab.active');
        const indicator = document.querySelector('.tab-indicator');
        indicator.style.left = activeTab.offsetLeft + 'px';
        indicator.style.width = activeTab.offsetWidth + 'px';

        // Refresh the active editor
        this.editors[tab].refresh();
    }

    // Change editor theme
    changeTheme(theme) {
        Object.values(this.editors).forEach(editor => {
            editor.setOption('theme', theme);
        });
    }

    // Change layout
    changeLayout(layout) {
        const mainContent = document.getElementById('mainContent');
        if (layout === 'vertical') {
            mainContent.classList.add('vertical');
        } else {
            mainContent.classList.remove('vertical');
        }
        
        // Refresh editors after layout change
        setTimeout(() => {
            Object.values(this.editors).forEach(editor => editor.refresh());
        }, 100);
    }

    // Handle code changes
    handleCodeChange() {
        this.saveToStorage();
        
        if (this.autoRun) {
            clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(() => {
                this.updatePreview();
            }, this.updateDelay);
        }
    }

    // Update line count display
    updateLineCount() {
        const editor = this.editors[this.currentTab];
        const cursor = editor.getCursor();
        const lineCount = editor.lineCount();
        document.getElementById('lineCount').textContent = 
            `Line: ${cursor.line + 1}, Col: ${cursor.ch + 1} | Total: ${lineCount}`;
    }

    // Update preview iframe
    updatePreview() {
        const html = this.editors.html.getValue();
        const css = this.editors.css.getValue();
        const js = this.editors.js.getValue();

        const preview = document.getElementById('preview');
        const document_content = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>
                    // Console capture
                    (function() {
                        const originalLog = console.log;
                        const originalError = console.error;
                        const originalWarn = console.warn;

                        console.log = function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'log',
                                args: args.map(arg => {
                                    try {
                                        return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                                    } catch {
                                        return String(arg);
                                    }
                                })
                            }, '*');
                            originalLog.apply(console, args);
                        };

                        console.error = function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'error',
                                args: args.map(arg => String(arg))
                            }, '*');
                            originalError.apply(console, args);
                        };

                        console.warn = function(...args) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'warn',
                                args: args.map(arg => String(arg))
                            }, '*');
                            originalWarn.apply(console, args);
                        };

                        window.onerror = function(msg, url, line, col, error) {
                            window.parent.postMessage({
                                type: 'console',
                                method: 'error',
                                args: [msg + ' (Line: ' + line + ')']
                            }, '*');
                        };
                    })();

                    // User code
                    try {
                        ${js}
                    } catch(err) {
                        console.error('Error: ' + err.message);
                    }
                </script>
            </body>
            </html>
        `;

        preview.srcdoc = document_content;
    }

    // Console methods
    toggleConsole() {
        const consolePanel = document.getElementById('consolePanel');
        consolePanel.classList.toggle('active');
    }

    clearConsole() {
        document.getElementById('consoleContent').innerHTML = '';
    }

    addConsoleMessage(method, args) {
        const consoleContent = document.getElementById('consoleContent');
        const logEntry = document.createElement('div');
        logEntry.className = `console-log ${method}`;
        logEntry.textContent = args.join(' ');
        consoleContent.appendChild(logEntry);
        consoleContent.scrollTop = consoleContent.scrollHeight;
    }

    // Storage methods
    saveToStorage() {
        const code = {
            html: this.editors.html.getValue(),
            css: this.editors.css.getValue(),
            js: this.editors.js.getValue(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('codelive_code', JSON.stringify(code));
        this.showNotification('Code saved!', 'success');
    }

    loadFromStorage() {
        const saved = localStorage.getItem('codelive_code');
        if (saved) {
            const code = JSON.parse(saved);
            this.editors.html.setValue(code.html || '');
            this.editors.css.setValue(code.css || '');
            this.editors.js.setValue(code.js || '');
        }
    }

    clearCode() {
        if (confirm('Are you sure you want to clear all code?')) {
            this.editors.html.setValue('');
            this.editors.css.setValue('');
            this.editors.js.setValue('');
            this.clearConsole();
            this.updatePreview();
            this.showNotification('Code cleared!', 'info');
        }
    }

    // Template methods
    openTemplatesModal() {
        document.getElementById('templatesModal').classList.add('active');
    }

    closeTemplatesModal() {
        document.getElementById('templatesModal').classList.remove('active');
    }

    loadTemplate(templateName) {
        const templates = this.getTemplates();
        const template = templates[templateName];
        
        if (template) {
            this.editors.html.setValue(template.html);
            this.editors.css.setValue(template.css);
            this.editors.js.setValue(template.js);
            this.updatePreview();
            this.closeTemplatesModal();
            this.showNotification(`Template "${templateName}" loaded!`, 'success');
        }
    }

    getTemplates() {
        return {
            blank: {
                html: '',
                css: '',
                js: ''
            },
            basic: {
                html: `<div class="container">
  <h1>Hello World!</h1>
  <p>This is a basic HTML template.</p>
  <button onclick="handleClick()">Click Me</button>
</div>`,
                css: `body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
}

button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #5568d3;
}`,
                js: `function handleClick() {
  alert('Button clicked!');
  console.log('Hello from JavaScript!');
}`
            },
            flexbox: {
                html: `<div class="flex-container">
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>
  <div class="box">Box 4</div>
</div>`,
                css: `body {
  margin: 0;
  padding: 20px;
  background: #1e1e2e;
}

.flex-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.box {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  transition: transform 0.3s;
}

.box:hover {
  transform: scale(1.1) rotate(5deg);
}`,
                js: `document.querySelectorAll('.box').forEach((box, index) => {
  box.addEventListener('click', () => {
    console.log(\`Box \${index + 1} clicked!\`);
  });
});`
            },
            animation: {
                html: `<div class="animated-container">
  <div class="circle"></div>
  <div class="square"></div>
  <div class="triangle"></div>
</div>`,
                css: `body {
  margin: 0;
  background: #1e1e2e;
  overflow: hidden;
}

.animated-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 100vh;
}

.circle {
  width: 100px;
  height: 100px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 2s infinite;
}

.square {
  width: 100px;
  height: 100px;
  background: #764ba2;
  animation: rotate 3s infinite linear;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #28a745;
  animation: pulse 1.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-50px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}`,
                js: `console.log('CSS animations running!');

// Click to change colors
document.querySelector('.circle').addEventListener('click', function() {
  this.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
});`
            },
            canvas: {
                html: `<canvas id="canvas" width="600" height="400"></canvas>
<div class="controls">
  <button onclick="clearCanvas()">Clear</button>
  <button onclick="drawRandom()">Random</button>
</div>`,
                css: `body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #1e1e2e;
  font-family: Arial, sans-serif;
}

#canvas {
  border: 3px solid #667eea;
  border-radius: 8px;
  background: white;
  cursor: crosshair;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #5568d3;
}`,
                js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let currentColor = '#667eea';

// Mouse events
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  draw(e);
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) draw(e);
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.beginPath();
});

function draw(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRandom() {
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 20 + 5;
    
    ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

console.log('Canvas ready! Draw something!');`
            },
            api: {
                html: `<div class="container">
  <h1>Random User Generator</h1>
  <button onclick="fetchUser()">Get Random User</button>
  <div id="userCard"></div>
</div>`,
                css: `body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 400px;
}

button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
}

button:hover {
  background: #5568d3;
}

#userCard {
  margin-top: 20px;
}

.user-info {
  text-align: left;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.user-info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
}`,
                js: `async function fetchUser() {
  const userCard = document.getElementById('userCard');
  userCard.innerHTML = '<p>Loading...</p>';
  
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    
    userCard.innerHTML = \`
      <div class="user-info">
        <img src="\${user.picture.large}" alt="User">
        <h2>\${user.name.first} \${user.name.last}</h2>
        <p><strong>Email:</strong> \${user.email}</p>
        <p><strong>Location:</strong> \${user.location.city}, \${user.location.country}</p>
        <p><strong>Age:</strong> \${user.dob.age}</p>
      </div>
    \`;
    
    console.log('User data:', user);
  } catch (error) {
    userCard.innerHTML = '<p>Error loading user</p>';
    console.error('Error:', error);
  }
}

console.log('Ready! Click the button to fetch a random user.');`
            }
        };
    }

    // Fullscreen toggle
    toggleFullscreen() {
        const previewPanel = document.querySelector('.preview-panel');
        previewPanel.classList.toggle('fullscreen');
    }

    // Notification
    showNotification(message, type = 'info') {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Handle console messages from iframe
window.addEventListener('message', (e) => {
    if (e.data.type === 'console') {
        if (window.codeEditor) {
            window.codeEditor.addConsoleMessage(e.data.method, e.data.args);
        }
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.codeEditor = new CodeEditor();
    console.log('CodeLive Editor initialized!');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
