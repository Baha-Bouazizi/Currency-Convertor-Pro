class CurrencyConverter {
    constructor() {
        this.exchangeRates = {};
        this.previousRates = {};
        this.chart = null;
        this.apiKeyAlphaVantage = 'X1FW6FLNQRDDM81G'; // Replace with your Alpha Vantage API key

        
    }

    async fetchRates() {
        try {
            const url = 'https://open.er-api.com/v6/latest/USD'; // Reliable API
            const res = await fetch(url);
            const data = await res.json();

            if (res.ok) {
                if (Object.keys(this.previousRates).length > 0) {
                    this.checkForRateChanges(data.rates);
                }

                this.exchangeRates = data.rates;
                this.previousRates = { ...data.rates };
            } else {
                console.error('Error loading currency data:', data);
            }
        } catch (error) {
            console.error('Error fetching rates:', error.message);
        }
    }

    async fetchHistoricalData(baseCurrency, targetCurrency) {
        const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${baseCurrency}&to_symbol=${targetCurrency}&apikey=${this.apiKeyAlphaVantage}`;
    
        try {
            const res = await fetch(url);
            const data = await res.json();
    
            // Vérifiez la structure des données
            console.log('Fetched data:', data);
    
            if (data["Time Series FX (Daily)"]) {
                const historicalData = Object.keys(data["Time Series FX (Daily)"]).slice(0, 359).map(date => ({
                    date,
                    rate: parseFloat(data["Time Series FX (Daily)"][date]["4. close"]),
                    min: parseFloat(data["Time Series FX (Daily)"][date]["3. low"]),
                    max: parseFloat(data["Time Series FX (Daily)"][date]["2. high"]),
                }));
    
                // Vérifiez les données historiques
                console.log('Historical Data:', historicalData);
    
                // Get data for the last 7 days
                const lastWeekData = historicalData.slice(0, 7);
                console.log('Last Week Data:', lastWeekData);
    
                const minRate = Math.min(...lastWeekData.map(data => data.min));
                const maxRate = Math.max(...lastWeekData.map(data => data.max));
                const lastCloseRate = lastWeekData[0].rate;
    
                return { historicalData, minRate, maxRate, lastCloseRate, lastWeekData };
            } else {
                console.error('No historical data found or API error:', data);
            }
        } catch (error) {
            console.error('Error fetching historical data:', error.message);
        }
        return { historicalData: [], minRate: 0, maxRate: 0, lastCloseRate: 0, lastWeekData: [] };
    }
    
    


    calculateWeeklyChange(historicalData) {
        if (!Array.isArray(historicalData) || historicalData.length < 7) {
            return 'Data not available';
        }
    
        const latestRate = historicalData[0].rate;
        const oldestRate = historicalData[6].rate; // Data for the 7th day ago
    
        const change = ((latestRate - oldestRate) / oldestRate) * 100;
        return `${latestRate - oldestRate > 0 ? '+' : ''}${(latestRate - oldestRate).toFixed(4)} (${change.toFixed(2)}%)`;
    }
    
    

    convert(amount, fromCurrency, toCurrency) {
        if (isNaN(amount) || amount <= 0) {
            return NaN; // Retourner NaN en cas d'entrée invalide
        }
        const fromRate = this.exchangeRates[fromCurrency.toUpperCase()];
        const toRate = this.exchangeRates[toCurrency.toUpperCase()];
        if (!fromRate || !toRate) {
            return NaN; // Retourner NaN si la devise n'est pas supportée
        }
        const convertedValue = (amount / fromRate) * toRate;
        return convertedValue; // Retourner le nombre directement
    }
    
    
    populateSelects() {
        const fromCurrency = document.querySelector("#from");
        const toCurrency = document.querySelector("#to");
    
        for (let code in this.exchangeRates) {
            const optionFrom = document.createElement("option");
            optionFrom.value = code.toLowerCase();
            optionFrom.textContent = `${code.toUpperCase()} - ${code}`;
            optionFrom.setAttribute("data-flag", code.toLowerCase()); // Set flag class
            fromCurrency.appendChild(optionFrom);
    
            const optionTo = document.createElement("option");
            optionTo.value = code.toLowerCase();
            optionTo.textContent = `${code.toUpperCase()} - ${code}`;
            optionTo.setAttribute("data-flag", code.toLowerCase()); // Set flag class
            toCurrency.appendChild(optionTo);
        }
        fromCurrency.value = "usd";
        toCurrency.value = "eur";
        this.updateFlagIcons();
    }

    updateFlagIcons() {
        const fromCurrency = document.querySelector("#from");
        const toCurrency = document.querySelector("#to");
    
        const fromFlag = fromCurrency.options[fromCurrency.selectedIndex].getAttribute("data-flag");
        const toFlag = toCurrency.options[toCurrency.selectedIndex].getAttribute("data-flag");
    
        document.querySelector("#from-flag").className = `flag-icon flag-icon-${fromFlag}`;
        document.querySelector("#to-flag").className = `flag-icon flag-icon-${toFlag}`;
    }

    async updateChart() {
        const fromCurrency = document.querySelector("#from").value.toUpperCase();
        const toCurrency = document.querySelector("#to").value.toUpperCase();
        const formattedResult = ` ${fromCurrency.toUpperCase()}  To  ${toCurrency.toUpperCase()}`;

    
        try {
            const { historicalData, minRate, maxRate, lastCloseRate } = await this.fetchHistoricalData(fromCurrency, toCurrency);
    
            const ctx = document.getElementById('exchangeRateChart').getContext('2d');
    
            if (this.chart) {
                this.chart.destroy(); // Destroy the previous chart instance
            }
    
            // Create the chart
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: historicalData.map(data => data.date),
                    datasets: [
                        {
                            label: `${fromCurrency} to ${toCurrency}`,
                            data: historicalData.map(data => data.rate),
                            borderColor: '#2ECC71', // Green Xe
                            backgroundColor: 'rgba(46, 204, 113, 0.2)', // Slightly transparent green background
                            borderWidth: 2,
                            pointBackgroundColor: '#2ECC71', // Green Xe for points
                            pointBorderColor: '#fff', // White for point borders
                            pointHoverBackgroundColor: '#fff', // White background on hover
                            pointHoverBorderColor: '#2ECC71', // Green Xe border on hover
                            tension: 0.4
                        },
                        {
                            label: `${fromCurrency} to ${toCurrency} (Min)`,
                            data: historicalData.map(data => data.min),
                            borderColor: '#FF5733', // Red for min rate
                            backgroundColor: 'rgba(255, 87, 51, 0.2)', // Slightly transparent red background
                            borderWidth: 1,
                            pointBackgroundColor: '#FF5733',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#FF5733',
                            tension: 0.4
                        },
                        {
                            label: `${fromCurrency} to ${toCurrency} (Max)`,
                            data: historicalData.map(data => data.max),
                            borderColor: '#3498DB', // Blue for max rate
                            backgroundColor: 'rgba(52, 152, 219, 0.2)', // Slightly transparent blue background
                            borderWidth: 1,
                            pointBackgroundColor: '#3498DB',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: '#3498DB',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                }
                            }
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 14
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Exchange Rate',
                                font: {
                                    size: 16
                                }
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.3)' // Light gray for grid
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                                font: {
                                    size: 16
                                }
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.3)' // Light gray for grid
                            }
                        }
                    }
                }
            });

            // Add background text
            const originalDraw = this.chart.draw;
            this.chart.draw = function() {
                originalDraw.apply(this, arguments);
    
                ctx.save();
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = 'rgba(46, 204, 113, 0.3)'; // Slightly transparent green Xe
                ctx.textAlign = 'center';
                ctx.fillText('Currency Charts'+' : '+formattedResult, this.width / 2, this.height / 2);
                ctx.restore();
            };
    
        } catch (error) {
            console.error('Error updating the chart:', error.message);
        }
    }
    ////////////////////////////////////////////

  
    scrollToChartSection() {
        const chartSection = document.getElementById('chart-container');
        if (chartSection) {
            chartSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Element with ID "chart-section" not found.');
        }
    }

    scrollToSelectSection() {
        const selectSection = document.getElementById('main-container');
        if (selectSection) {
            selectSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Element with ID "select-container" not found.');
        }
    }

    async addPairClickListeners() {
        const buttons = document.querySelectorAll('.view-chart-btn');
        buttons.forEach(button => {
            button.addEventListener('click', async () => {
                const currencyCode = button.getAttribute('data-currency');
                // Call showPairChart with the currency code
                await this.showPairChart(currencyCode);
            });
        });
    }

    async showPairChart(currencyCode) {
        document.querySelector("#from").value = 'usd'; // USD is the base currency
        document.querySelector("#to").value = currencyCode.toLowerCase(); // Selected currency

        // Update flag icons
        this.updateFlagIcons();

        // Update the chart
        await this.updateChart(); // Ensure the chart is updated after setting the currencies
         this.convertAndDisplay() ;
        // Scroll to the chart section
     this.scrollToSelectSection() ;
    }

    async fetchPopularPairs() {
        await this.fetchRates(); // Assurez-vous que les taux sont récupérés en premier
    
        const allowedCurrencies = ['eur', 'gbp', 'jpy', 'cad', 'aud', 'chf', 'cny', 'zar'];
        const pairs = [];
    
        for (const code of allowedCurrencies) {
            const rate = this.exchangeRates[code.toUpperCase()];
            const { lastWeekData } = await this.fetchHistoricalData('USD', code.toUpperCase());
    
            // Vérifiez que lastWeekData est défini avant de passer à calculateWeeklyChange
            const change = lastWeekData ? this.calculateWeeklyChange(lastWeekData) : 'Data not available';
            pairs.push({
                code,
                name: this.getCurrencyName(code),
                rate: rate ? rate.toFixed(5) : 'N/A',
                change
            });
        }
    
        const popularPairsDiv = document.getElementById('popular-pairs');
        const boxDiv = popularPairsDiv.querySelector('.ag-courses_box');
        boxDiv.innerHTML = '';
    
        pairs.forEach(pair => {
            const pairDiv = document.createElement('div');
            pairDiv.className = 'ag-courses_item';
            pairDiv.innerHTML = `
                <a href="#" class="ag-courses-item_link">
                    <div class="ag-courses-item_bg"></div>
                    <div class="ag-courses-item_title">
                        ${pair.name} (${pair.code.toUpperCase()})
                    </div>
                    <div class="ag-courses-item_date-box">
                        Rate: <span class="ag-courses-item_date">${pair.rate} ${pair.code.toUpperCase()}</span>
                        <br/>
                        Change: ${pair.change}
                    </div>
                    <button class="view-chart-btn" data-currency="${pair.code}">View chart</button>
                </a>
            `;
            boxDiv.appendChild(pairDiv);
        });
    
        this.addPairClickListeners();
    }
    
    
    

    getCurrencyName(code) {
        // Implement or replace with actual logic to get currency names
        const currencyNames = {
            'eur': 'Euro',
            'gbp': 'British Pound',
            'jpy': 'Japanese Yen',
            'cad': 'Canadian Dollar',
            'aud': 'Australian Dollar',
            'chf': 'Swiss Franc',
            'cny': 'Chinese Yuan Renminbi',
            'zar': 'South African Rand'
        };
        return currencyNames[code] || 'Unknown';
    }
    
   
    
   

  
    

    //////////////////////////////////
    /*     les taux des banques */ 

    /////////////////////////////////////////
    addEventListeners() {
        const fromCurrency = document.querySelector("#from");
        const toCurrency = document.querySelector("#to");
        const inputAmount = document.querySelector(".input-amount");
        const swapBtn = document.querySelector(".swap-btn");

        fromCurrency.addEventListener("change", () => {
            this.convertAndDisplay();
            this.updateChart();
            this.updateFlagIcons(); // Update flags
this.scrollToChartSection        });

        toCurrency.addEventListener("change", () => {
            this.convertAndDisplay();
            this.updateChart();
            this.updateFlagIcons(); // Update flags

        });

        inputAmount.addEventListener("input", this.convertAndDisplay.bind(this));

        swapBtn.addEventListener("click", () => {
            const fromCur = fromCurrency.value;
            const toCur = toCurrency.value;
            fromCurrency.value = toCur;
            toCurrency.value = fromCur;
            this.convertAndDisplay();
            this.updateChart();
            this.updateFlagIcons(); // Update flags

        });
    }

    isUserLoggedIn() {
        return !!localStorage.getItem('currentUser');
    }

    convertAndDisplay() {
        const amount = parseFloat(document.querySelector(".input-amount").value);
        const fromCurrency = document.querySelector("#from").value;
        const toCurrency = document.querySelector("#to").value;
        const result = this.convert(amount, fromCurrency, toCurrency);
        const resultElement = document.querySelector(".result");
    
        // Vérifier si le résultat est un nombre valide
        if (isNaN(result)) {
            console.error('Conversion rate is not a valid number');
            resultElement.innerHTML = 'Error in conversion';
            return;
        }
    
        // Format du résultat de la conversion
        const formattedResult = `${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(5)} ${toCurrency.toUpperCase()}`;
        
        // Formater la date
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = now.toLocaleString('default', { month: 'short' });
        const year = now.getFullYear();
        const hours = now.getUTCHours().toString().padStart(2, '0');
        const minutes = now.getUTCMinutes().toString().padStart(2, '0');
        const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
    
        // Afficher le résultat
        resultElement.innerHTML = `
            <span class="result-value">${formattedResult}</span><br>
            <span class="result-date">${formattedDate}</span>
        `;
    
        // Sauvegardez l'historique si l'utilisateur est connecté
        if (this.isUserLoggedIn()) {
            this.saveConversionHistory(amount, fromCurrency, toCurrency, result);
        }
    }
    
    
    

    saveConversionHistory(amount, from, to, converted) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return;

        const userHistoryKey = `conversionHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
        
        history.push({ date: new Date(), amount, from, to, converted });
        localStorage.setItem(userHistoryKey, JSON.stringify(history));
    }

    showNotification(message, type) {
        const notificationContainer = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationContainer.appendChild(notification);
    
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    async initialize() {
        await this.fetchRates();
        this.populateSelects();
        this.addEventListeners();
        this.updateChart();
        this.fetchPopularPairs() ;
        this.calculateWeeklyChange() ;
        setInterval(() => {
            this.fetchRates();
          // Mettez à jour les taux d'intérêt
        }, 300000); // Check for rate changes every 5 minutes

        // Display profile link if user is logged in
        const user = JSON.parse(localStorage.getItem('currentUser'));
        document.addEventListener('DOMContentLoaded', () => {
            const profileLink = document.getElementById('profile-link');
            if (isUserLoggedIn()) {
                // Affiche le lien du profil si l'utilisateur est connecté
                profileLink.style.display = 'block';
            } else {
                // Cache le lien du profil si l'utilisateur n'est pas connecté
                profileLink.style.display = 'none';
            }
        });
    }
}