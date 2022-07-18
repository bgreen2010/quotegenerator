const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




console.log(load);
let apiQuotes = [];

// //Show Loading
function load() {
    load.hidden = false;
    quoteContainer.hidden = true;
    setTimeout(complete, 3000);
}

// //Hide Loading
function complete(){
    const load = document.getElementById("loader");
    const text = document.getElementById("text-cont");

    quoteContainer.hidden = false;
    load.hidden = true;
    text.hidden = true;
}



// Get Quotes from an API
//Show Me the Knew Quote
function newQuote() {
    // Pick a Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace with unknown
    if(!quote.author) {
        authorText.textContent = 'Unknown';

    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote Length
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set quote and hide loaderr


    quoteText.textContent = quote.text;
}

async function getQuotes() {
    load();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }   catch(error) {
        //catch error here
    }
}

    //TWEET Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//ONLOAD
getQuotes();
