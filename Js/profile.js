class Profile {
    constructor() {
        this.init();
    }
    
    async init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.checkUser();
            this.setupEventListeners();
            this.getLocation();
            this.setupTheme();
            this.displayFinancialNews();
            this.displayUserStatistics(); // New method call
        });
    }

    checkUser() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            alert("Please log in to access this page.");
            window.location.href = 'login.html';
        } else {
            this.updateProfileUI(user);
        }
    }

    updateProfileUI(user) {
        document.getElementById('username').innerText = user.username;
        document.getElementById('email').innerText = user.email;
        document.getElementById('profile-link').style.display = 'block';

        const profileImage = document.getElementById('profile-picture');
        profileImage.src = user.image || "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"; // Default image

        document.getElementById('profile-section').style.display = 'block';
     } 
     deleteUserProfile() {
        if (confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) {
                alert("Aucun utilisateur connecté.");
                return;
            }
    
            // Supprimer les données utilisateur de localStorage
            const userHistoryKey = `conversionHistory_${user.email}`;
            localStorage.removeItem(userHistoryKey);
            localStorage.removeItem('currentUser');
    
            // Rediriger vers la page d'accueil ou de connexion
            window.location.href = 'index.html'; // Remplacez par l'URL de votre page d'accueil ou de connexion
        }
    }
    

    setupEventListeners() {
        document.getElementById('convert-page-btn').addEventListener('click', () => window.location.href = 'index.html');
        document.getElementById('edit-profile').addEventListener('click', () => window.location.href = 'edit-profile.html');
        document.getElementById('logout-link').addEventListener('click', () => this.logout());
        document.querySelector(".close").addEventListener("click", () => document.getElementById("history-modal").style.display = "none");
        document.getElementById("show-history-btn").addEventListener("click", () => this.displayHistory());
        document.getElementById('view-favorites-btn').addEventListener('click', () => window.location.href = 'favorite-currencies.html');
        document.getElementById('delete-profile').addEventListener('click', () => this.deleteUserProfile());

    }

    async getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                    if (!response.ok) throw new Error('Failed to fetch location data.');
                    const data = await response.json();
                    document.getElementById('location').innerText = `${data.city}, ${data.countryName}`;
                    await this.getLocalCurrency(data.countryCode);
                } catch (error) {
                    console.error('Error fetching location data: ', error);
                }
            }, (error) => {
                console.error('Geolocation error: ', error);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    async getLocalCurrency(countryCode) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            if (!response.ok) throw new Error('Failed to fetch currency data.');
            const countries = await response.json();
            const country = countries.find(c => c.cca2 === countryCode);
            if (country && country.currencies) {
                const currency = Object.values(country.currencies)[0];
                document.getElementById('local-currency').innerText = `Local Currency: ${currency.name} (${currency.symbol})`;
            }
        } catch (error) {
            console.error('Error fetching local currency: ', error);
        }
    }





    async setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
    
        // Check local storage for theme preference
        const currentTheme = localStorage.getItem('darkMode');
    
        if (currentTheme === 'enabled') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        } else {
            document.body.removeAttribute('data-theme');
            themeToggle.checked = false;
        }
    
        // Add event listener to toggle theme
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    async fetchFinancialNews() {
        const apiKey = '333efec059e941d484b688608d916c90'; 
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
            const data = await response.json();
            return data.articles;
        } catch (error) {
            console.error('Error fetching financial news: ', error);
            return [];
        }
    }

    async displayFinancialNews() {
        let newsList = document.getElementById('news-list');
        if (newsList) {
            let articles = await this.fetchFinancialNews();
            if (articles.length > 0) {
                newsList.innerHTML = articles.slice(0, 5).map(article => `
                    <li>
                        <a href="${article.url}" target="_blank">${article.title}</a>
                        <p>${article.description}</p>
                    </li>
                `).join('');
            } else {
                newsList.innerHTML = '<li>No financial news available at the moment.</li>';
            }
        }
    }

    async displayHistory() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return alert("User not logged in!");

        const userHistoryKey = `conversionHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];

        if (history.length === 0) {
            alert("No conversion history available.");
            return;
        }

        const historyContent = document.getElementById("history-content");
        historyContent.innerHTML = "";

        history.forEach((entry) => {
            const timelineEvent = document.createElement("div");
            timelineEvent.classList.add("timeline__event");
            timelineEvent.innerHTML = `
                <div class="timeline__event__icon">
                    <i class="lni lni-currency"></i>
                    <div class="timeline__event__date">
                        ${new Date(entry.date).toLocaleDateString()}
                    </div>
                </div>
                <div class="timeline__event__content">
                    <h3 class="timeline__event__title">Converted Currency</h3>
                    <div class="timeline__event__description">
                        <span class="timeline__event__amount">${entry.amount} ${entry.from}</span> converted to 
                        <span class="timeline__event__converted">${entry.converted} ${entry.to}</span>.
                    </div>
                </div>
            `;
            historyContent.appendChild(timelineEvent);
        });

        document.getElementById("history-modal").style.display = "block";
    }
   
    async displayUserStatistics() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return alert("User not logged in!");
    
        const userHistoryKey = `conversionHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
    
        const stats = {
            totalConversions: history.length,
            totalAmount: 0,
            currencyCount: {},
        };
    
        history.forEach(entry => {
            const amount = parseFloat(entry.amount);
            if (!isNaN(amount)) {
                stats.totalAmount += amount;
            }
    
            stats.currencyCount[entry.from] = (stats.currencyCount[entry.from] || 0) + 1;
            stats.currencyCount[entry.to] = (stats.currencyCount[entry.to] || 0) + 1;
        });
    
        const mostFrequentCurrency = Object.entries(stats.currencyCount)
            .reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
    
        document.getElementById('total-conversions').innerText = `Total Conversions: ${stats.totalConversions}`;
        document.getElementById('total-amount').innerText = `Total Amount Converted: ${stats.totalAmount.toFixed(2)}`;
        document.getElementById('most-frequent-currency').innerText = `Most Frequently Converted Currency: ${mostFrequentCurrency}`;
    }
    
    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Instantiate the Profile class
const p = new Profile();