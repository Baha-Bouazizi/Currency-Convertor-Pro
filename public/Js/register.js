class ImageUploader {
    constructor(cloudName, uploadPreset) {
        this.cloudName = cloudName;
        this.uploadPreset = uploadPreset;
    }

    async upload(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    }
}

class Registration {
    constructor(imageUploader) {
        this.imageUploader = imageUploader;
        this.init();
    }

    init() {
        document.getElementById('register-button').addEventListener('click', async (event) => {
            event.preventDefault();
            const errors = this.validateForm();
            if (errors.length > 0) {
                this.displayErrors(errors);
                return;
            }

            const email = document.getElementById('email').value.trim();
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                this.displayErrors(["Email already registered."]);
                return;
            }

            const imageFile = document.getElementById('image').files[0];
            if (!imageFile) {
                this.displayErrors(["Profile image is required."]);
                return;
            }

            const imageUrl = await this.imageUploader.upload(imageFile);
            if (!imageUrl) {
                this.displayErrors(["Image upload failed."]);
                return;
            }

            this.saveUser(imageUrl);

            const currentUser = {
                username: document.getElementById('username').value.trim(),
                email,
                profilePicture: imageUrl
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            alert("Registration successful!");
            window.location.href = 'login.html';
        });

        this.addRealTimeValidation();
    }

    validateForm() {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm_password').value.trim();
        const errors = [];

        if (!username) errors.push("Username is required.");
        if (!email) errors.push("Email is required.");
        if (!password) errors.push("Password is required.");
        if (!confirmPassword) errors.push("Confirm Password is required.");
        if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
        if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");
        if (!/[\W_]/.test(password)) errors.push("Password must contain at least one special character.");
        if (password.length < 8) errors.push("Password must be at least 8 characters long.");
        if (password !== confirmPassword) errors.push("Passwords do not match.");

        return errors;
    }

    displayErrors(errors) {
        const registerError = document.getElementById('register-error');
        registerError.innerText = errors.join(', ');
    }

    saveUser(imageUrl) {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        users.push({ username, email, password, image: imageUrl });
        localStorage.setItem('users', JSON.stringify(users));
    }

    addRealTimeValidation() {
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirm_password');

        passwordField.addEventListener('input', () => {
            const errors = this.validateForm();
            this.displayErrors(errors);
        });

        confirmPasswordField.addEventListener('input', () => {
            const errors = this.validateForm();
            this.displayErrors(errors);
        });
    }
}

// Initialize the registration process
document.addEventListener('DOMContentLoaded', () => {
    const imageUploader = new ImageUploader('da7kimrfl', 'qj456gku');
    new Registration(imageUploader);
});
