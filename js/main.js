const currencyList = document.querySelectorAll('.select-box select');
const fromCurrency = document.querySelector('.from select');
const fromImage = document.querySelector('.from img');
const toCurrency = document.querySelector('.to select');
const toImage = document.querySelector('.to img');
const exchangeIcon = document.querySelector('.icon');
const exchangeRateTxt = document.querySelector('.exchange-rate');
const getButton = document.querySelector('form button');

for (let i = 0; i < currencyList.length; i++) {
  for (currency_code in country_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == 'KRW' ? 'selected' : '';
    }
    if (i == 1) {
      selected = currency_code == 'USD' ? 'selected' : '';
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    currencyList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  currencyList[i].addEventListener('change', (e) => {
    setImage(e.target);
  });
}

function setImage(list) {
  for (let code in country_list) {
    if (code == list.value) {
      let imgTag = list.parentElement.querySelector('img');
      imgTag.src = `https://countryflagsapi.com/svg/${country_list[code]}`;
    }
  }
}

function showResult(result, amount) {
  let exchangeRate = result.conversion_rates[toCurrency.value];
  let totalExchangeRate = (exchangeRate * amount).toFixed(2);
  if (!exchangeRate) return (exchangeRateTxt.innerText = `There's no data`);
  exchangeRateTxt.innerText = `${amount} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
}

function exchangeFromTo() {
  let tempSave = fromCurrency.value;
  console.log(tempSave); //k
  fromCurrency.value = toCurrency.value;
  console.log(fromCurrency.value);
  toCurrency.value = tempSave;
  console.log(toCurrency.value);
  setImage(fromCurrency);
  setImage(toCurrency);
  getExchangeRate();
}

function getExchangeRate() {
  const amountInput = document.querySelector('.amount input');
  let amount = amountInput.value;
  if (amount == '' || amount == '0') {
    amountInput.value = '1000';
    amount = 1000;
  }
  exchangeRateTxt.innerText = 'Getting exchange rate...';
  let url = `https://v6.exchangerate-api.com/v6/1862a2331b658ab331e71d95/latest/${fromCurrency.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => showResult(result, amount))
    .catch(() => {
      exchangeRateTxt.innerText = 'Something went wrong';
    });
}

getButton.addEventListener('click', (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener('load', () => {
  getExchangeRate();
});

exchangeIcon.addEventListener('click', exchangeFromTo);
