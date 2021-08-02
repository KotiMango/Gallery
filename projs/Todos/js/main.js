function onInit() {
  console.log('Hi');
  renderTodos();
}

function renderTodos() {
  var todos = getTodosForDisplay();
  if (todos[0]) {
    var strHTMLs = todos.map(function (todo) {
      return `<li class="${
        todo.isDone ? 'done' : ''
      } imprtnt${todo.importance}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}   , ${parseTimestamp(todo.timestamp)}
            <button onclick="onRemoveTodo('${
              todo.id
            }', event)">x</button>
        </li>`;
    });
  } else {
    console.log('meow');
    var strHTML = getEmptyMsg();
    strHTMLs = [strHTML];
  }

  var elTodoList = document.querySelector('.todo-list');
  elTodoList.innerHTML = strHTMLs.join('');

  document.querySelector('.total-count').innerText = getTotalCount();
  document.querySelector(
    '.active-count'
  ).innerText = getActiveCount();
}
function parseTimestamp(tStamp) {
  return new Date(tStamp).toLocaleString();
}

function onToggleTodo(todoId) {
  console.log('Toggling: ', todoId);
  toggleTodo(todoId);
  renderTodos();
}

function onRemoveTodo(todoId, ev) {
  console.log('Removing: ', todoId);
  ev.stopPropagation();
  removeTodo(todoId);
  renderTodos();
}

function onAddTodo() {
  var elTxt = document.querySelector('[name=newTodoTxt]');
  var txt = elTxt.value;
  if (!txt) return;
  var inputArr = txt.split('-');
  var inputObj = { task: inputArr[0], importance: inputArr[1] };
  if (inputObj.importance > 3 && inputObj.importance < 1) return;
  addTodo(inputObj.task, inputObj.importance);
  elTxt.value = '';

  renderTodos();
}

function onSetFilter(filterBy) {
  console.log('Filtering by:', filterBy);
  setFilterBy(filterBy);
  renderTodos();
}
function onSetSort(sortBy) {
  console.log('Sorting by:', sortBy);
  setSortBy(sortBy);
  renderTodos();
}
