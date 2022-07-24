const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = document.querySelector('header p');
const closeIcon = document.querySelector('.uil-times');
const addBtn = document.querySelector('.content button');
const titleBox = document.querySelector('.title input');
const descBox = document.querySelector('.description textarea');
const errorMsg = document.querySelector('.error');

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false;
let updateId;

addBox.addEventListener('click', () => {
  popupBox.classList.add('show');
  titleBox.focus();
});

const showNotes = () => {
  document.querySelectorAll('.note').forEach((note) => note.remove());
  notes.forEach((note, i) => {
    let liTag = `
      <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li onclick='updateNote(${i})'><i class="uil uil-pen"></i>Edit</li>
              <li onclick='deleteNote(${i})'><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>
    `;
    addBox.insertAdjacentHTML('afterend', liTag);
  });
};
showNotes();

const updateNote = (noteId) => {
  isUpdate = true;
  updateId = noteId;
  addBtn.innerText = 'Update Note';
  popupTitle.innerText = 'Update a Note';
  titleBox.value = notes[noteId].title;
  descBox.value = notes[noteId].description;
  addBox.click();
};

const deleteNote = (noteId) => {
  let confirmDelete = confirm('Are you sure you want to delete this note?');
  if (!confirmDelete) return;

  notes.splice(noteId, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes();
};

const showMenu = (elem) => {
  elem.parentElement.classList.add('show');
  document.addEventListener('click', (e) => {
    if (e.target.tagName != 'I' || e.target != elem) {
      elem.parentElement.classList.remove('show');
    }
  });
};

closeIcon.addEventListener('click', () => {
  isUpdate = false;
  titleBox.value = '';
  descBox.value = '';
  addBtn.innerText = 'Add Note';
  popupTitle.innerText = 'Add a new Note';
  popupBox.classList.remove('show');
});

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let title = titleBox.value;
  let desc = descBox.value;
  if (!(title && desc)) {
    errorMsg.classList.remove('hidden');
    return;
  }
  errorMsg.classList.add('hidden');
  let submitedDate = new Date().toLocaleDateString();
  let noteInfo = {
    title: title,
    description: desc,
    date: submitedDate,
  };
  if (!isUpdate) {
    notes.push(noteInfo);
  } else {
    isUpdate = false;
    notes[updateId] = noteInfo;
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  closeIcon.click();
  showNotes();
});
