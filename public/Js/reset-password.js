class PasswordReset {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('set-password-button').addEventListener('click', () => this.handlePasswordReset());
    }

    async handlePasswordReset() {
        const errors = this.validatePasswordForm();
        if (errors.length > 0) {
            this.displayErrors(errors);
            return;
        }

        const email = localStorage.getItem('resetEmail');
        if (!email) {
            this.displayErrors(["Reset process not initiated."]);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (!user) {
            this.displayErrors(["User not found. Please initiate the reset process again."]);
            return;
        }

        user.password = document.getElementById('new_password').value.trim();
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form fields
        document.getElementById('new_password').value = '';
        document.getElementById('confirm_password').value = '';

        alert("Password updated successfully!");
        window.location.href = 'login.html';
    }

    validatePasswordForm() {
        const newPassword = document.getElementById('new_password').value.trim();
        const confirmPassword = document.getElementById('confirm_password').value.trim();
        const errors = [];

        if (!/[A-Z]/.test(newPassword)) errors.push("New password must contain at least one uppercase letter.");
        if (!/[0-9]/.test(newPassword)) errors.push("New password must contain at least one number.");
        if (!/[\W_]/.test(newPassword)) errors.push("New password must contain at least one special character.");
        if (newPassword.length < 8) errors.push("New password must be at least 8 characters long.");
        if (newPassword !== confirmPassword) errors.push("Passwords do not match.");

        return errors;
    }

    displayErrors(errors) {
        const resetError = document.getElementById('reset-error');
        resetError.innerText = errors.join(', ');
    }
}

// Initialize the PasswordReset class
document.addEventListener('DOMContentLoaded', () => {
    new PasswordReset();
});
