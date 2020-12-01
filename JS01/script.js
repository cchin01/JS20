const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const fas = document.getElementById("fas");
const loader = document.querySelector(".loader");
loader.hidden = true;

function StartLoadingSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function StopLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quote From API
async function getQuote() {
  StartLoadingSpinner();
  authorText.classList.remove("animation");
  quoteText.classList.remove("animation");
  fas.classList.remove("animation");
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (authorText.innerHTML === data.quoteAuthor) {
      getQuote();
    }
    else{
      authorText.innerHTML = data.quoteAuthor;

      // 將空白的作者填上Unknown
      if (authorText.innerHTML == "") {
        authorText.innerHTML = "Unknown";
      }
      quoteText.innerHTML = "";
      quoteText.innerHTML = data.quoteText;
      fas.classList.add("animation");
      authorText.classList.add("animation");
      quoteText.classList.add("animation");
      while (true) {
        if (quoteText.innerHTML !== "") {
          StopLoadingSpinner();
          break;
        }
      }
    }
  } catch (error) {
    getQuote();
  }
}


// TWITTER sharing funuction
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listerner
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
