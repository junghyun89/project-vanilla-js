const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
const filters = document.querySelectorAll('.filters span');
const clearBtn = document.querySelector('.clear-btn');
const checkBoxes = document.querySelectorAll('.task input');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let editId;
let isEdited = false;

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelector('span.active').classList.remove('active');
    filter.classList.add('active');
    showTaskList(filter.id);
  });
});

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    tasks[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    tasks[selectedTask.id].status = 'pending';
  }
  console.log(tasks);
  setLocalStorage();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  setLocalStorage();
  showTaskList();
}

function editTask(selectedTask) {
  editId = selectedTask;
  taskInput.value = tasks[selectedTask].name;
  isEdited = true;
  taskInput.focus();
  console.log(isEdited);
}

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add('show');
  document.addEventListener('click', (e) => {
    if (e.target.tagName != 'I' || e.target != selectedTask) {
      taskMenu.classList.remove('show');
    }
  });
}

function showTaskList(filter = 'all') {
  let liTag = '';
  document.querySelectorAll('.task').forEach((task) => task.remove());
  if (!tasks) return;
  tasks.forEach((task, i) => {
    let isCompleted = task.status == 'completed' ? 'checked' : '';
    if (filter == task.status || filter == 'all') {
      liTag += `
        <li class="task">
          <label for="${i}">
            <input onclick='updateStatus(this)' type="checkbox" id="${i}" ${isCompleted}>
            <p class='${isCompleted}'>${task.name}</p>
          </label>
          <div class="settings">
            <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
              <li onclick='editTask(${i})'><i class="uil uil-pen"></i>Edit</li>
              <li onclick='deleteTask(${i})'><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>
      `;
    }
  });
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
}
showTaskList();

function setLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener('load', () => {
  taskInput.focus();
});

taskInput.addEventListener('change', () => {
  let userTask = taskInput.value.trim();
  if (isEdited) {
    tasks[editId].name = userTask;
    isEdited = false;
  } else {
    let task = { name: userTask, status: 'pending' };
    tasks.push(task);
  }
  setLocalStorage();
  showTaskList();
  taskInput.value = '';
});

clearBtn.addEventListener('click', () => {
  tasks.splice(0, tasks.length);
  setLocalStorage();
  showTaskList();
});
