document.addEventListener('DOMContentLoaded', () => {
    const documentationBtn = document.getElementById('documentation-btn');

    if (documentationBtn) {
        documentationBtn.addEventListener('click', () => {
            window.location.href = 'documentation.html'; // Remplacez par l'URL de votre page de documentation
        });
    }
});
