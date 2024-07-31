// script.js

document.addEventListener('DOMContentLoaded', () => {
    const tableRows = document.querySelectorAll('#exchange-table tbody tr');
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // URL de l'API

    async function fetchExchangeRates() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Erreur lors de la récupération des taux de change:', error);
        }
    }

    function updateTable(rates) {
        tableRows.forEach(row => {
            const pair = row.dataset.pair;
            const rateCell = row.querySelector('.rate');
            const variationCell = row.querySelector('.variation');
            const arrow = variationCell.querySelector('.arrow');
            const variationText = variationCell.querySelector('.variation-text');

            const [baseCurrency, targetCurrency] = pair.split('/');

            if (rates[baseCurrency] && rates[targetCurrency]) {
                const baseToUsd = rates[baseCurrency];
                const targetToUsd = rates[targetCurrency];
                const newRate = (targetToUsd / baseToUsd).toFixed(2);
                
                rateCell.textContent = newRate.replace('.', ',');

                // Récupérer l'ancien taux et le mettre à jour
                const oldRate = parseFloat(rateCell.getAttribute('data-old-rate')) || newRate;
                rateCell.setAttribute('data-old-rate', newRate);
                
                // Calculer la variation
                const variation = (newRate - oldRate).toFixed(2);
                const variationTextContent = (variation > 0 ? '+' : '') + variation;
                variationText.textContent = variationTextContent;

                // Appliquer la classe en fonction de la variation
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

    async function refreshData() {
        const rates = await fetchExchangeRates();
        if (rates) {
            updateTable(rates);
        }
    }

    refreshData(); // Initial data fetch
    setInterval(refreshData, 60000); // Refresh every minute
});
