// history.js

class HistoryManager {
    constructor() {
        this.initEventListeners();
    }

    initEventListeners() {
        const closeModal = document.querySelector(".close");
        closeModal.addEventListener("click", () => this.closeModal());

        document.getElementById("show-history-btn").addEventListener("click", () => this.displayHistory());
    }

    closeModal() {
        document.getElementById("history-modal").style.display = "none";
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

        history.forEach((entry, index) => {
            const timelineEvent = document.createElement("div");
            timelineEvent.classList.add("timeline__event", "animated", "fadeInUp", `delay-${history.length - index}s`, `timeline__event--type${(index % 3) + 1}`);
            timelineEvent.innerHTML = `
                <div class="timeline__event__icon">
                    <i class="lni-currency"></i>
                    <div class="timeline__event__date">
                        ${new Date(entry.date).toLocaleDateString()}
                    </div>
                </div>
                <div class="timeline__event__content">
                    <div class="timeline__event__title">
                        Conversion
                    </div>
                    <div class="timeline__event__description">
                        <p>${entry.amount} ${entry.from} converted to ${entry.converted} ${entry.to}</p>
                    </div>
                </div>
            `;
            historyContent.appendChild(timelineEvent);
        });

        document.getElementById("history-modal").style.display = "block";
    }

    saveConversionHistory(amount, from, to, converted) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return;

        const userHistoryKey = `conversionHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey)) || [];
        
        history.push({ date: new Date().toISOString(), amount, from, to, converted });
        localStorage.setItem(userHistoryKey, JSON.stringify(history));
    }
}

// Initialize the HistoryManager class when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    new HistoryManager();
});