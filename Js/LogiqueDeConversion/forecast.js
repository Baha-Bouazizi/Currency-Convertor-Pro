document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('tips-container');
    const apiKey = '265ab5e9b0844b688bc25d23aafaf4fa'; // Remplacez par votre clé API
    const itemsPerPage = 4;
    let currentPage = 0;
    let articles = [];

    // URL pour l'API NewsAPI avec un terme de recherche spécifique aux conseils financiers
    const url = `https://newsapi.org/v2/everything?q=financial+advice&apiKey=${apiKey}`;

    // Fonction pour afficher les articles
    function displayArticles(articlesToDisplay) {
        container.innerHTML = ''; // Efface le conteneur avant d'ajouter de nouveaux articles
        if (articlesToDisplay.length === 0) {
            container.innerHTML = '<p>Aucun conseil financier disponible.</p>';
            return;
        }
        articlesToDisplay.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'tip'; // Changer la classe en 'tip' pour correspondre aux styles

            const title = document.createElement('h4');
            title.textContent = article.title;
            articleDiv.appendChild(title);

            const description = document.createElement('p');
            description.textContent = article.description || 'Pas de description disponible';
            articleDiv.appendChild(description);

            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Lire plus';
            link.target = '_blank';
            articleDiv.appendChild(link);

            container.appendChild(articleDiv);
        });
    }

    // Fonction pour charger et afficher les articles
    function loadArticles() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.articles) {
                    // Filtrer les articles pour ne conserver que ceux qui contiennent des mots-clés financiers
                    articles = data.articles.filter(article => {
                        const keywords = ['advice', 'financial', 'money', 'investment', 'savings'];
                        return keywords.some(keyword => 
                            (article.title && article.title.toLowerCase().includes(keyword)) ||
                            (article.description && article.description.toLowerCase().includes(keyword))
                        );
                    });

                    const start = currentPage * itemsPerPage;
                    const end = start + itemsPerPage;
                    displayArticles(articles.slice(start, end));
                    
                    // Mettre à jour ou créer le bouton "Voir plus"
                    let moreButton = document.getElementById('more-button');
                    if (!moreButton) {
                        moreButton = document.createElement('button');
                        moreButton.id = 'more-button';
                        moreButton.textContent = 'Voir plus';
                        moreButton.addEventListener('click', () => {
                            currentPage++;
                            const start = currentPage * itemsPerPage;
                            const end = start + itemsPerPage;
                            displayArticles(articles.slice(start, end));

                            // Si toutes les pages sont affichées, masquer le bouton
                            if (end >= articles.length) {
                                moreButton.style.display = 'none';
                            }
                        });
                        container.parentElement.appendChild(moreButton);
                    } else {
                        moreButton.style.display = 'block';
                    }
                } else {
                    container.innerHTML = '<p>Aucun conseil financier disponible.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
                container.innerHTML = '<p>Erreur lors de la récupération des conseils financiers.</p>';
            });
    }

    // Charger les articles au démarrage
    loadArticles();
});
