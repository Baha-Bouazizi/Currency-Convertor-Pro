class ExchangeLocator {
    constructor(findButtonId, listId) {
        this.findButton = document.getElementById(findButtonId);
        this.list = document.getElementById(listId);

        this.findButton.addEventListener('click', () => this.locateExchanges());
    }

    locateExchanges() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const exchanges = await this.fetchNearbyExchanges(latitude, longitude);
                    this.displayExchanges(exchanges);
                },
                (error) => {
                    console.error('Geolocation error: ', error);
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    async fetchNearbyExchanges(latitude, longitude) {
        const overpassQuery = `
            [out:json];
            node
              [amenity=bank]
              (around:2000, ${latitude}, ${longitude});
            out;
        `;

        try {
            const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
            if (!response.ok) throw new Error('Failed to fetch data from Overpass API.');
            const data = await response.json();
            return data.elements;
        } catch (error) {
            console.error('Error fetching data from Overpass API: ', error);
            return [];
        }
    }

    displayExchanges(exchanges) {
        this.list.innerHTML = '';

        if (exchanges.length === 0) {
            this.list.innerHTML = '<li>No currency exchanges found nearby.</li>';
            return;
        }

        exchanges.forEach((exchange) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${exchange.tags.name || 'Unnamed Exchange'}</h3>
                <p>Location: Lat ${exchange.lat}, Lon ${exchange.lon}</p>
                <a href="https://www.openstreetmap.org/?mlat=${exchange.lat}&mlon=${exchange.lon}&zoom=15" target="_blank">View on Map</a>
            `;
            this.list.appendChild(listItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const exchangeLocator = new ExchangeLocator('find-exchanges', 'exchange-list');
});
