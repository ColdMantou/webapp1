document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const cards = JSON.parse(localStorage.getItem('cards')); // Retrieve card data
    
    const returnButton = document.getElementById('return-button');
    returnButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect back to the main page
    });
    
    // Function to create and display cards
    function displayResults() {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'result-card';

            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = card.question; // Display question

            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = card.answer; // Display answer

            cardElement.appendChild(cardFront);
            cardElement.appendChild(cardBack);

            cardElement.addEventListener('click', () => {
                cardElement.classList.toggle('flipped');
            });

            resultsContainer.appendChild(cardElement);
        });
    }

    displayResults();
});