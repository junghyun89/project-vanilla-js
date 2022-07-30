const textarea = document.querySelector('textarea');
const voiceList = document.querySelector('select');
const convertBtn = document.querySelector('form button');

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === 'Google US English' ? 'selected' : '';
    let option = `<option value='${voice.name}' ${selected}>${voice.name}(${voice.lang})</option>`;
    voiceList.innerHTML += option;
  }
}
synth.addEventListener('voiceschanged', voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      //voiceList.value 는 선택된 voiceList 값
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

convertBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(textarea.value);
  if (textarea.value == '') return;
  if (!synth.speaking) {
    textToSpeech(textarea.value);
  }
  if (textarea.value.length > 80) {
    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        convertBtn.innerText = 'Convert To Speech';
      }
    }, 500);
    if (isSpeaking) {
      synth.resume();
      isSpeaking = false;
      convertBtn.innerText = 'Pause Speech';
    } else {
      synth.pause();
      isSpeaking = true;
      convertBtn.innerText = 'Resume Speech';
    }
  }
});

// else {
//   convertBtn.innerText = 'Convert To Speech';
// }
