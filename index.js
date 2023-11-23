document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const cardCount = document.getElementById('card-count');
    const levelDisplay = document.getElementById('level-display');
    const showResultsButton = document.getElementById('show-results-button');
    
    // Get a reference to the edit button
    const editButton = document.getElementById('edit-button');

    // Structuring decks
    let decks = {
        deck1: [{ question: "11", answer: "Click Edit to write your answer", deck: "deck1" }, { question: "12", answer: "Click Edit to write your answer", deck: "deck1" }, { question: "13", answer: "Click Edit to write your answer", deck: "deck1" }, { question: "14", answer: "Click Edit to write your answer", deck: "deck1" }],
        deck3: [{ question: "31", answer: "Click Edit to write your answer", deck: "deck3" }, { question: "32", answer: "Click Edit to write your answer", deck: "deck3" }, { question: "33", answer: "Click Edit to write your answer", deck: "deck3" }, { question: "34", answer: "Click Edit to write your answer", deck: "deck3" }],
        deck5: [{ question: "51", answer: "Click Edit to write your answer", deck: "deck5" }, { question: "52", answer: "Click Edit to write your answer", deck: "deck5" }, { question: "53", answer: "Click Edit to write your answer", deck: "deck5" }, { question: "54", answer: "Click Edit to write your answer", deck: "deck5" }]
    };

    let currentCardIndex = 0;
    let isFlipped = false;
    let shuffledCards = [];

    // Edit button event listener
    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        let newText = prompt('Edit your text:', shuffledCards[currentCardIndex].answer);
        if (newText !== null && newText.trim() !== '') {
            shuffledCards[currentCardIndex].answer = newText;
            displayCard(currentCardIndex); // Call this to update the card display
        }
    });
    

    function shuffleAndPickCards() {
        shuffledCards = [];
        shuffledCards.push(...selectRandomCards(decks.deck1, 4));
        shuffledCards.push(...selectRandomCards(decks.deck3, 3));
        shuffledCards.push(...selectRandomCards(decks.deck5, 3));

        currentCardIndex = 0;
        isFlipped = false;
        displayCard(currentCardIndex);
    }

    function selectRandomCards(deck, count) {
        let shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
        return shuffledDeck.slice(0, count);
    }
    
    function displayCard(index) {
        // Remove only elements with the 'card' class
       
        // Get references to the front and back faces of the card
        const cardFront = document.querySelector('.card-front');
        const cardBack = document.querySelector('.card-back');

        // Set the content for the front and back faces
        cardFront.textContent = shuffledCards[index].question;
        cardBack.textContent = shuffledCards[index].answer;

        // Update the display of the edit button based on the card flip state
        editButton.style.display = isFlipped ? 'block' : 'none';

        // Update the level display and card count
        updateLevelDisplay(shuffledCards[index]);
        updateCardCount(index + 1, shuffledCards.length);

        // Show or hide the "Show Results" button based on the current card index
        if (index + 1 === shuffledCards.length) {
            showResultsButton.style.display = 'block';
        } else {
            showResultsButton.style.display = 'none';
        }
        
    }

    cardContainer.addEventListener('click', () => {
        isFlipped = !isFlipped;
        cardContainer.classList.toggle('flipped', isFlipped);
        // Clear any existing timeouts to prevent multiple edit buttons from being scheduled
        if (window.editButtonTimeout) {
            clearTimeout(window.editButtonTimeout);
        }

        // Immediately hide the edit button when the card is not flipped
        if (!isFlipped) {
            editButton.style.display = 'none';
        } else {
            // Delay the display of the edit button when the card is flipped
            window.editButtonTimeout = setTimeout(() => {
                editButton.style.display = 'block';
            }, 200); // Change 3000 to the number of milliseconds you want to wait
        }
    });
 
    // Event listener for "Show Results" button
    showResultsButton.addEventListener('click', () => {
        // Store the shuffled cards in localStorage
        localStorage.setItem('cards', JSON.stringify(shuffledCards));

        // Redirect to another HTML file which displays all cards
        window.location.href = 'results.html'; // Replace 'results.html' with your actual file name
    });

    function updateCardCount(current, total) {
        cardCount.textContent = `${current}/${total}`;
    }

    function updateLevelDisplay(card) {
        if (card.deck === 'deck1') {
            levelDisplay.textContent = 'Level 1: Discovery';
        } else if (card.deck === 'deck3') {
            levelDisplay.textContent = 'Level 2: Insight';
        } else if (card.deck === 'deck5') {
            levelDisplay.textContent = 'Level 3: Destiny';
        }
    }

    
    document.getElementById('shuffle-button').addEventListener('click', shuffleAndPickCards);
    document.getElementById('prev-button').addEventListener('click', () => {
        isFlipped = false;
        cardContainer.classList.remove('flipped');

        currentCardIndex = (currentCardIndex - 1 + shuffledCards.length) % shuffledCards.length;
        displayCard(currentCardIndex);
    });
    document.getElementById('next-button').addEventListener('click', () => {
        isFlipped = false;
        cardContainer.classList.remove('flipped');

        currentCardIndex = (currentCardIndex + 1) % shuffledCards.length;
        displayCard(currentCardIndex);
    });
    
    shuffleAndPickCards(); // Shuffle and display the first card on initial load
});