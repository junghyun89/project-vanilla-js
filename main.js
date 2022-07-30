const quoteText = document.querySelector('.quote');
const author = document.querySelector('.name');
const quoteBtn = document.querySelector('button');
const soundBtn = document.querySelector('.sound');
const copyBtn = document.querySelector('.copy');
const instagramBtn = document.querySelector('.instagram');

function randomQuote() {
  quoteBtn.classList.add('loading');
  quoteBtn.innerText = 'Loading Quote...';
  fetch('https://api.quotable.io/random')
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      author.innerText = result.author;
      quoteBtn.innerText = 'New Quote';
      quoteBtn.classList.remove('loading');
    });
}

quoteBtn.addEventListener('click', randomQuote);

soundBtn.addEventListener('click', () => {
  let quote = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${author.innerText}`
  );
  quote.lang = 'en-US';
  speechSynthesis.speak(quote);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

instagramBtn.addEventListener('click', () => {
  myGitUrl = 'https://github.com/junghyun89';
  window.open(myGitUrl);
});
