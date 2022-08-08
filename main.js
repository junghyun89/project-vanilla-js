const pollArea = document.querySelector('.poll-area');

let options = ['HTML', 'Java', 'Python', 'jQuery'];

function clicked(e) {
  let parentTag = e.parentElement;
  for (let i = 0; i < options.length; i++) {
    if (parentTag.children[i].classList.contains('selected')) {
      parentTag.children[i].classList.remove('selected');
    }
  }
  e.classList.add('selected');
  for (let j = 0; j < options.length; j++) {
    parentTag.children[j].classList.add('selectall');
  }
}

for (let i = 0; i < options.length; i++) {
  let randomPercent = Math.floor(Math.random() * 100);
  let option = `<label for="" onclick="clicked(this)">
                  <div class="row">
                    <div class="column">
                      <span class="circle"></span>
                      <span>${options[i]}</span>
                    </div>
                    <span class="percent">${randomPercent}%</span>
                  </div>
                  <div class="progress" style="--w:${randomPercent};"></div>
                </label>
              `;
  pollArea.insertAdjacentHTML('beforeend', option);
}
