const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];
let id = 100;

window.onload = function() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    render();
  }
};

function makeTodo() {
  return `<li class="list-group-item">
  <input type="checkbox" class="form-check-input me-2" id="1" />
  <label for="1"><span class="">${text}</span></label>
  <button class="btn btn-danger btn-sm float-end">delete</button>
  </li>`;
}

function newTodo() {
  let text = prompt("Enter task:");
  let todo = { id: id++, text: text, checked: Math.random() > 0.5 };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join("");
  updateCounter();
}

function renderTodo(todo) {
  return `<li class="list-group-item">
  <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? "checked": ""} onChange= " checkTodo(${todo.id})" />
  <label for="${todo.id}"><span class="${todo.checked ? "text-success text-decoration-line-through":""}">${todo.text}</span></label>
  <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
  </li>`;
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo=> !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

function checkTodo(id) {
  todos = todos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked }: todo));
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

