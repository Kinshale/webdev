import quotes from "./Quotes.js";

// slideshow

const textContainer = document.querySelector(".text-container");
const imageContainer = document.querySelector(".image-container");
let slideIndex = 1;
setInterval(nextSlide, 6000);

function nextSlide() {
  if (slideIndex % 3 == 0) {
    textContainer.innerHTML =
      "<h2>Basketball quotes</h2><p>Discover some of the most intersting and famous quotes about the game of basketball: either<span>scroll down</span> with your mouse or click on the <span>DISCOVER</span> button.<br>You may also use some keyboard shortcut to navigate in the page: just press<kbd>shift</kbd> + <kbd>o</kbd> to toggle the list.<br>And don't be afraid to share the quotes with your friends on Twitter or Pinterest.</p>";
    imageContainer.style.backgroundImage = `url(
      "https://github.com/Kinshale/FCC-Basketball-random-quote-machine/tree/main/Players-Image/basketball-rim-height.jpg")`;
  }
  if (slideIndex % 3 == 1) {
    textContainer.innerHTML =
      "<h2>Tecnologies used</h2><p> This pen was built for the FCC <em>Front End Development Libraries Certification</em>.<br> I've employed a mix of HTML and native JS, plus SASS as my CSS framework. The project isopen-source and you can view the code on <a>GitHub</a> (inserire Link).<br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, quibusdam. Ea evenietlaborum ipsum soluta doloremque.</p>";
    imageContainer.style.backgroundImage = 'url("https://github.com/Kinshale/FCC-Basketball-random-quote-machine/tree/main/ball.jpg")';
  }
  if (slideIndex % 3 == 2) {
    textContainer.innerHTML =
      "<h2>Kinshale</h2><p> Kinshale is a FCC student and he built this pen.<br>Lorem, ipsum dolor sit amet consecteturadipisicing elit. Porro maiores quaerat voluptates ad aliquid commodi nemo consequatur nisiconsectetur? Deserunt animi a dolor natus qui odit eius inventore tempore dicta voluptatumfugiat, quos, aut, eum aspernatur ex unde sit.</p>";
    imageContainer.style.backgroundImage =
      'url("https://github.com/Kinshale/FCC-Basketball-random-quote-machine/tree/main/Kinshale.jpg")';
  }
  slideIndex += 1;
}

// menu icon

const menuIcon = document.querySelector(".icon-cont");
const scMenu = document.querySelector(".shortcut-menu");

menuIcon.onclick = function () {
  menuIcon.classList.toggle("open");
  scMenu.toggleAttribute("hidden");
  scMenu.classList.toggle("bounce");
};

const quoteBox = document.getElementById("quote-box");

// getting a New Quote;
let indexes = [];

let currentPos = 0;
function randomIndex() {
  return Math.floor(Math.random() * quotes.length);
}

function uniqueIndex() {
  let index = randomIndex();
  if (!indexes.slice(-3).includes(index)) {
    indexes.push(index);
    currentPos = indexes.length - 1;
    return index;
  } else {
    return uniqueIndex();
  }
}

const sectionQuote = document.getElementById("section-quote");
const quoteText = document.getElementById("text");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const backImg = document.getElementById("quotes-bg-img");

newQuoteBtn.addEventListener("click", newQuote);

function newQuote() {
  let uniqIndex = uniqueIndex();

  genImageTextTweet(uniqIndex);
}

function genImageTextTweet(index) {
  let newText = quotes[index].text;
  let newAuthor = quotes[index].author;
  quoteText.innerHTML = newText;
  author.innerHTML = "— " + newAuthor;
  sectionQuote.style.backgroundImage = `url(${"https://github.com/Kinshale/FCC-Basketball-random-quote-machine/tree/main" + quotes[index].img})`;
  quoteText.style.fontSize = quotes[index].font;

  generateTweetUrl(newText, newAuthor);
  sectionQuote.scrollIntoView(top);
}

const nextQuote = () => {
  if (currentPos == indexes.length - 1) {
    alert("Press 'New Quote' ");
    return;
  }

  currentPos = currentPos + 1;
  let nextIndex = indexes[currentPos];
  genImageTextTweet(nextIndex);
};

const prevQuote = () => {
  if (currentPos == 0) {
    alert("Queue ended");
    return;
  }

  currentPos = currentPos - 1;
  let prevIndex = indexes[currentPos];
  genImageTextTweet(prevIndex);
};

// tweetting quote;
const tweetBtn = document.getElementById("tweet-quote");
function generateTweetUrl(text, author) {
  var url = "https://twitter.com/intent/tweet?text=";
  url = url + text + " " + author;
  tweetBtn.setAttribute("href", url);
}

// key board shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    newQuote();
  }
  if (event.key === "ArrowRight") {
    nextQuote();
  }
  if (event.key === "ArrowLeft") {
    prevQuote();
  }
  if (event.key === "T" && event.shiftKey) {
    window.open("https://twitter.com/intent/tweet?text=", "_blank");
  }
  if (event.key === "O" && event.shiftKey) {
    menuIcon.classList.toggle("open");
    scMenu.toggleAttribute("hidden");
    scMenu.classList.toggle("bounce");
  }
  if (event.key === "D" && event.shiftKey) {
    sectionQuote.scrollIntoView(top);
  }
});
