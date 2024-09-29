class EditProfile {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.user) {
            alert("Please log in to access this page.");
            window.location.href = 'login.html';
        }
    }

    loadProfile() {
        document.getElementById('edit-username').value = this.user.username;
        document.getElementById('edit-email').value = this.user.email;
    }

    saveProfile() {
        const oldEmail = this.user.email;
        const newEmail = document.getElementById('edit-email').value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Vérifier si le nouvel e-mail est différent de l'ancien et s'il est déjà utilisé
        if (newEmail !== oldEmail && users.some(user => user.email === newEmail)) {
            alert("This email is already in use. Please choose another one.");
            return;
        }
    
        // Préparer les données de l'utilisateur mises à jour
        const updatedUser = {
            ...this.user,
            username: document.getElementById('edit-username').value,
            email: newEmail
        };
    
        const fileInput = document.getElementById('edit-profile-picture');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedUser.image = reader.result;
                this.saveUser(updatedUser, oldEmail, users);
            };
            reader.readAsDataURL(file);
        } else {
            this.saveUser(updatedUser, oldEmail, users);
        }
    }
    
    saveUser(user, oldEmail, users) {
        // Update users list
        const updatedUsers = users.map(u => u.email === oldEmail ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update currentUser
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Update history and stats keys if email is changed
        if (user.email !== oldEmail) {
            const userHistoryKey = `conversionHistory_${oldEmail}`;
            const newUserHistoryKey = `conversionHistory_${user.email}`;
            const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
            localStorage.removeItem(userHistoryKey);
            localStorage.setItem(newUserHistoryKey, JSON.stringify(history));

            const userStatsKey = `userStats_${oldEmail}`;
            const newUserStatsKey = `userStats_${user.email}`;
            const stats = JSON.parse(localStorage.getItem(userStatsKey)) || {};
            localStorage.removeItem(userStatsKey);
            localStorage.setItem(newUserStatsKey, JSON.stringify(stats));

            // Update favorite currencies
            this.updateFavoriteCurrencies(oldEmail, user.email);
        }

        alert("Profile updated successfully.");
        window.location.href = 'profile.html';
    }

    updateFavoriteCurrencies(oldEmail, newEmail) {
        const oldFavoritesKey = `favoriteCurrencies_${oldEmail}`;
        const newFavoritesKey = `favoriteCurrencies_${newEmail}`;
        const favoriteCurrencies = JSON.parse(localStorage.getItem(oldFavoritesKey)) || [];

        // Remove old favorites and set new favorites
        localStorage.removeItem(oldFavoritesKey);
        localStorage.setItem(newFavoritesKey, JSON.stringify(favoriteCurrencies));
    }

    setupEventListeners() {
        document.getElementById('edit-profile-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.saveProfile();
        });

        document.querySelector('.cancel-btn').addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }

    init() {
        this.loadProfile();
        this.setupEventListeners();
    }
}

// Initialize the EditProfile class when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const editProfile = new EditProfile();
    editProfile.init();
});
