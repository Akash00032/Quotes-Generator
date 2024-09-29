const api_url = 'https://api.quotable.io/random';
const favoriteQuotesList = document.getElementById('favorite-quotes');
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const loadingIndicator = document.getElementById('loading');

// Pre-stored quotes as fallback
const localQuotes = [
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "Get busy living or get busy dying.", author: "Stephen King" },
    { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { content: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { content: "It is never too late to be what you might have been.", author: "George Eliot" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { content: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { content: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
    { content: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { content: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { content: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { content: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { content: "I never dreamed about success, I worked for it.", author: "Estee Lauder" }
];

const randomLocalQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
updateQuote(randomLocalQuote.content, randomLocalQuote.author);



// Show loading indicator
function showLoading() {
    loadingIndicator.style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    loadingIndicator.style.display = 'none';
}

// Fetch a new random quote from the API and display it
async function loadNewQuote() {
    showLoading();
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        updateQuote(data.content, data.author);
    } catch (error) {
        console.error('Error fetching quote from API, using fallback quotes:', error);
        const randomLocalQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        updateQuote(randomLocalQuote.content, randomLocalQuote.author);
    } finally {
        hideLoading();
    }
}

// Update the quote text and author in the UI
function updateQuote(quote, author) {
    quoteElement.textContent = `"${quote}"`;
    authorElement.textContent = `- ${author}`;
}

// Save the current quote to the favorite list with a delete button
function saveQuote() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;

    if (quote && author) {
        const listItem = document.createElement('li');
        listItem.textContent = `${quote} ${author}`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);
        favoriteQuotesList.appendChild(listItem);
    }
}

// Load saved quotes on page load
function loadSavedQuotes() {
    localQuotes.forEach((quoteData) => {
        const listItem = document.createElement('li');
        listItem.textContent = `"${quoteData.content}" - ${quoteData.author}`;

        // Create delete button for each saved quote
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        // Append delete button to the list item
        listItem.appendChild(deleteButton);
        favoriteQuotesList.appendChild(listItem);
    });
}

// Tweet the current quote
function tweetQuote() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + ' ' + author)}`;
    window.open(tweetURL, '_blank');
}

// Share the current quote via Web Share API
function shareQuote() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: quote + ' ' + author,
        }).catch((error) => console.error('Error sharing:', error));
    } else {
        alert('Web Share API is not supported in your browser.');
    }
}

// Toggle the visibility of the favorite quotes section
function toggleFavorites() {
    const favoritesSection = document.getElementById('favorites-section');
    
    // Toggle display between block (visible) and none (hidden)
    if (favoritesSection.style.display === 'none' || favoritesSection.style.display === '') {
        favoritesSection.style.display = 'block';
    } else {
        favoritesSection.style.display = 'none';
    }
}
// Save the current quote to the favorite list with a delete button
function saveQuote() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;

    if (quote && author) {
        const listItem = document.createElement('li');
        listItem.textContent = `${quote} ${author}`;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);
        favoriteQuotesList.appendChild(listItem);

        // Scroll to the bottom of the list when a new quote is added
        favoriteQuotesList.scrollTop = favoriteQuotesList.scrollHeight;
    }
}


// Initialize the page and set up button event listeners
window.onload = () => {
    loadSavedQuotes(); // Load predefined or saved quotes

    // Event listeners for buttons
    document.getElementById('load-new-quote').addEventListener('click', loadNewQuote);
    document.getElementById('save-quote').addEventListener('click', saveQuote);
    document.getElementById('tweet-quote').addEventListener('click', tweetQuote);
    document.getElementById('share-quote').addEventListener('click', shareQuote);
};
