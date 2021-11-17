let quoteContainer = document.getElementById('quote-container');
let quote = document.getElementById('quote');
let writer = document.getElementById('author');
let newQuotes = document.getElementById('new-quote');
let twitterBtn = document.getElementById('twitter');
let loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const fetchQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check to see if author is null
    if(!fetchQuote.author){
        writer.textContent = 'Unknown'
    } else {
        writer.textContent = fetchQuote.author
    }
    // Check quote text Length to determine styling
    quote.classList.toggle('long-quote', fetchQuote.text.length > 50);

    // Set quote, hide loader
    quote.textContent = fetchQuote.text;    
    complete();
    
}



// Get Quotes FROM API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${writer.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners

// Add button event listener for quote
newQuotes.addEventListener('click', getQuotes);

// Add twitter button event listener
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();