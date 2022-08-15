const input = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const todoCount = document.querySelector('.footer span');
const clearBtn = document.querySelector('.footer button');

let todos = JSON.parse(localStorage.getItem('todo') || '[]');

function deleteTodo(e) {
  let deleteIndex = todos.indexOf(e.parentElement.innerText);
  todos.splice(deleteIndex, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  showTodo();
}

function addTodo(todo) {
  let liTag = `<li>${todo} <span onclick='deleteTodo(this)'><i class="fas fa-trash"></i></span></li>`;
  todoList.innerHTML += liTag;
  todoCount.innerText = `You have ${todos.length} pending tasks`;
  todos.length != 0
    ? clearBtn.classList.add('active')
    : clearBtn.classList.remove('active');
}

function showTodo() {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    addTodo(todo);
  });
  todoCount.innerText = `You have ${todos.length} pending tasks`;
  todos.length != 0
    ? clearBtn.classList.add('active')
    : clearBtn.classList.remove('active');
}

input.addEventListener('input', () => {
  input.value.trim() != 0
    ? addBtn.classList.add('active')
    : addBtn.classList.remove('active');
});

addBtn.addEventListener('click', () => {
  let todo = input.value;
  todos.push(todo);
  localStorage.setItem('todo', JSON.stringify(todos));
  addTodo(todo);
  input.value = '';
  input.focus();
  addBtn.classList.remove('active');
});

clearBtn.addEventListener('click', () => {
  todos = [];
  localStorage.setItem('todo', JSON.stringify(todos));
  showTodo();
});

window.addEventListener('load', () => {
  showTodo();
  input.focus();
});
