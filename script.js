let quote = document.getElementById('quote');
let writer = document.getElementById('author');
let newQuotes = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes array
    const ranQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return ranQuote;
}

newQuotes.addEventListener('click', getQuotes);

// Get Quotes FROM API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        let { text, author } = newQuote();
        console.log('This is the text ', author);
        if(author === null || undefined){
            author = 'Unknown'
        };
        writer.innerHTML = author;
    } catch (err) {
        // Catch Error Here
    }
}

// On Load
getQuotes();
