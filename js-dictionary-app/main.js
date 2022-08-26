const wrapper = document.querySelector('.wrapper');
const searchInput = document.querySelector('.search input');
const clearIcon = document.querySelector('.search span');
const details = document.querySelectorAll('.details');
const synonyms = document.querySelector('.synonyms .list');
const infoText = document.querySelector('.info-text');
const volumeIcon = document.querySelector('.word i');

let word;

function search(synonyms) {
  searchInput.value = synonyms;
  fetchApi(synonyms);
}

function showData(result, word) {
  details.forEach((detail) => {
    detail.style.display = 'block';
  });
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    return;
  }
  let definitions = result[0].meanings[0].definitions[0];
  let phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0]?.text}`;
  let meanings = result[0].meanings[0];
  let datas = [
    definitions.definition,
    definitions.example,
    meanings.synonyms[0],
  ];
  datas.forEach((data, i) => {
    if (data == undefined) {
      details[i + 1].style.display = 'none';
      return;
    }
  });
  wrapper.classList.add('active');
  document.querySelector('.word p').innerText = result[0].word;
  document.querySelector('.word span').innerText = phonetics;
  document.querySelector('.meaning span').innerText = definitions.definition;
  document.querySelector('.example span').innerText = definitions.example;
  synonyms.innerHTML = '';
  for (let i = 0; i < meanings.synonyms?.length; i++) {
    let tag = `<span onclick=search('${meanings.synonyms[i]}')>${meanings.synonyms[i]},</span>`;
    synonyms.insertAdjacentHTML('beforeend', tag);
  }
}

function fetchApi(word) {
  wrapper.classList.remove('active');
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      showData(result, word);
    });
}

searchInput.addEventListener('change', (e) => {
  word = e.target.value;
  infoText.style.color = '#000';
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  fetchApi(word);
});

clearIcon.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  word = '';
  wrapper.classList.remove('active');
  infoText.style.color = '#9a9a9a';
  infoText.innerText =
    'Type any existing word and press enter to get meaning, example, synonyms, etc.';
});

volumeIcon.addEventListener('click', () => {
  let utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
});
