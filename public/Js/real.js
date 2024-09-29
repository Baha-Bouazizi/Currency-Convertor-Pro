class ExchangeRateUpdater {
    constructor(apiUrl, tableSelector, interval) {
        this.apiUrl = apiUrl;
        this.tableRows = document.querySelectorAll(`${tableSelector} tbody tr`);
        this.refreshInterval = interval;

        this.refreshData(); // Fetch initial data
        setInterval(() => this.refreshData(), this.refreshInterval); // Refresh every interval
    }

    async fetchExchangeRates() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched rates:', data.rates); // Log fetched rates
            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            return null;
        }
    }

    updateTable(rates) {
        console.log('Updating table with rates:', rates); // Log rates being used to update the table
        this.tableRows.forEach(row => {
            const pair = row.dataset.pair;
            console.log('Processing pair:', pair); // Log the currency pair being processed
            const rateCell = row.querySelector('.rate');
            const variationCell = row.querySelector('.variation');
            const variationText = variationCell.querySelector('.variation-text');

            const [baseCurrency, targetCurrency] = pair.split('/');

            if (rates[baseCurrency] && rates[targetCurrency]) {
                const baseToUsd = rates[baseCurrency];
                const targetToUsd = rates[targetCurrency];
                const newRate = (targetToUsd / baseToUsd).toFixed(2); // Calculate new exchange rate

                // Update rate cell text
                rateCell.textContent = newRate.replace('.', ',');

                // Retrieve old rate and update with new rate
                const oldRate = parseFloat(rateCell.getAttribute('data-old-rate')) || newRate;
                rateCell.setAttribute('data-old-rate', newRate);

                // Calculate variation
                const variation = (newRate - oldRate).toFixed(2);
                const variationTextContent = (variation > 0 ? '+' : '') + variation;
                variationText.textContent = variationTextContent;

                // Apply class based on variation
                if (variation > 0) {
                    variationCell.classList.add('increase');
                    variationCell.classList.remove('decrease', 'constant');
                } else if (variation < 0) {
                    variationCell.classList.add('decrease');
                    variationCell.classList.remove('increase', 'constant');
                } else {
                    variationCell.classList.add('constant');
                    variationCell.classList.remove('increase', 'decrease');
                }
            }
        });
    }

    async refreshData() {
        const rates = await this.fetchExchangeRates();
        if (rates) {
            this.updateTable(rates);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://open.er-api.com/v6/latest/USD'; // API URL for exchange rates
    const tableSelector = '#exchange-table';
    const refreshInterval = 60000; // Refresh every 60 seconds

    new ExchangeRateUpdater(apiUrl, tableSelector, refreshInterval);
});
