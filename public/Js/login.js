class ThemeManager {
    constructor(themes) {
        this.themes = themes;
    }

    setTheme(theme) {
        const root = document.querySelector(":root");
        root.style.setProperty("--background", theme.background);
        root.style.setProperty("--color", theme.color);
        root.style.setProperty("--primary-color", theme.primaryColor);
    }

    displayThemeButtons() {
        const btnContainer = document.querySelector(".theme-btn-container");
        this.themes.forEach((theme) => {
            const div = document.createElement("div");
            div.className = "theme-btn";
            div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
            btnContainer.appendChild(div);
            div.addEventListener("click", () => this.setTheme(theme));
        });
    }
}

class LoginManager {
    constructor(formId, errorId, redirectUrl) {
        this.form = document.getElementById(formId);
        this.loginError = document.getElementById(errorId);
        this.redirectUrl = redirectUrl;

        this.form.addEventListener('submit', (event) => this.handleLogin(event));
    }

    handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Clear previous error message
        this.loginError.innerText = "";

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.email === email);

        if (user && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
            alert("Login successful!");
            window.location.href = this.redirectUrl; // Redirect to profile
        } else {
            this.loginError.innerText = "Invalid username or password.";
        }
    }
}

// Define themes
const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
];

// Initialize ThemeManager
const themeManager = new ThemeManager(themes);
themeManager.displayThemeButtons();

// Initialize LoginManager
const loginManager = new LoginManager('login-form', 'login-error', 'profile.html');
