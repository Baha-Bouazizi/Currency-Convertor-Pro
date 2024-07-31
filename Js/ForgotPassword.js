// forgotPassword.js

class ForgotPassword {
    constructor() {
        this.verificationCode = null;
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('reset-button').addEventListener('click', () => this.handleResetButtonClick());
    }

    handleResetButtonClick() {
        const email = document.getElementById('user_email').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (user) {
            const currentDate = new Date().toDateString();
            const resetAttempts = user.resetAttempts || {};

            resetAttempts[currentDate] = resetAttempts[currentDate] || 0;

            if (resetAttempts[currentDate] < 3) {
                this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                alert(`Your verification code is: ${this.verificationCode}`); // Consider sending this via email in a real app
                document.getElementById('forgot-success').innerText = "Check your email for the verification code.";
                document.getElementById('forgot-error').innerText = "";
                resetAttempts[currentDate]++;
                user.resetAttempts = resetAttempts;
                localStorage.setItem('users', JSON.stringify(users));
                this.showVerificationInput();
            } else {
                document.getElementById('forgot-error').innerText = "You have reached the maximum reset attempts for today.";
                document.getElementById('forgot-success').innerText = "";
            }
        } else {
            document.getElementById('forgot-error').innerText = "Email not found.";
            document.getElementById('forgot-success').innerText = "";
        }
    }

    showVerificationInput() {
        const formGroup = document.querySelector('.form-group');

        if (!document.getElementById('verification-code')) {
            const verificationInput = document.createElement('input');
            verificationInput.type = 'text';
            verificationInput.placeholder = 'Enter Verification Code';
            verificationInput.id = 'verification-code';
            verificationInput.required = true; // Ensure input is required
            formGroup.appendChild(verificationInput);

            const verifyButton = document.createElement('button');
            verifyButton.innerText = 'Verify Code';
            verifyButton.addEventListener('click', () => this.verifyCode());
            formGroup.appendChild(verifyButton);
        }
    }

    verifyCode() {
        const enteredCode = document.getElementById('verification-code').value;

        if (enteredCode === this.verificationCode) {
            alert("Verification successful! You can now reset your password.");
            document.getElementById('forgot-success').innerText = "Verification successful! Please reset your password.";
            document.getElementById('forgot-error').innerText = "";
            localStorage.setItem('resetEmail', document.getElementById('user_email').value);
            window.location.href = 'reset-password.html';
        } else {
            alert("Invalid verification code. Please try again.");
            document.getElementById('forgot-error').innerText = "Invalid verification code.";
            document.getElementById('forgot-success').innerText = "";
        }
    }
}

// Initialize the ForgotPassword class when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    new ForgotPassword();
});
