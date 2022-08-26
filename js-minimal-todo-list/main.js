const openBtn = document.querySelector('.icon');
const field = document.querySelector('.field');
const input = document.querySelector('.field input');
const addBtn = document.querySelector('.add-btn');
const ulTag = document.querySelector('ul');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

openBtn.addEventListener('click', () => {
  if (todos.length == 0) return;
  field.classList.toggle('hide');
  openBtn.classList.toggle('active');
});

function deleteTodo(e) {
  const deleteIndex = todos.indexOf(e.parentElement.textContent);
  todos.splice(deleteIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}

function showTodos() {
  ulTag.innerHTML = '';
  todos.forEach((todo) => {
    const liTag = `<li><span onclick='deleteTodo(this)'><i class="fa fa-trash"></i></span>${todo}</li>`;
    ulTag.innerHTML += liTag;
  });
}

addBtn.addEventListener('click', () => {
  const todo = input.value;
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
  input.value = '';
});

window.addEventListener('load', showTodos);
