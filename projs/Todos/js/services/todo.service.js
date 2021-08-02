var gTodos = [];
var gFilterBy = 'all';
var gSortBy = 'txt';
_createTodos();

function getTodosForDisplay() {
  if (gFilterBy === 'all') return getSortedTodos(gTodos);
  var todos = gTodos.filter(function (todo) {
    return (
      (gFilterBy === 'active' && !todo.isDone) ||
      (gFilterBy === 'done' && todo.isDone)
    );
  });
  var sortedTodos = getSortedTodos(todos);
  return sortedTodos;
}

function getSortedTodos(todos) {
  var sortedTodos;
  if (gSortBy === 'txt') {
    sortedTodos = todos.sort(function (a, b) {
      return a.txt > b.txt ? 1 : a.txt < b.txt ? -1 : 0;
    });
  } else if (gSortBy === 'importance') {
    sortedTodos = todos.sort(function (a, b) {
      return b.importance - a.importance;
    });
  } else {
    sortedTodos = todos.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });
  }
  console.log(sortedTodos);
  return sortedTodos;
}

function getEmptyMsg() {
  return `<li class= "imprtnt3">${
    gFilterBy === 'all'
      ? 'No Todos'
      : `No ${capitalize(gFilterBy)} Todos`
  }</li>`;
}

function removeTodo(todoId) {
  var idx = gTodos.findIndex(function (todo) {
    return todo.id === todoId;
  });
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addTodo(txt, importance) {
  var todo = {
    id: _makeId(),
    txt,
    isDone: false,
    importance,
    timestamp: Date.now(),
  };
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find(function (todo) {
    return todo.id === todoId;
  });
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy;
}
function setSortBy(sortBy) {
  gSortBy = sortBy;
}

function getTotalCount() {
  return gTodos.length;
}
function getActiveCount() {
  var activeTodos = gTodos.filter(function (todo) {
    return !todo.isDone;
  });
  return activeTodos.length;
}

function _saveTodosToStorage() {
  saveToStorage('todoDB', gTodos);
}

function _createTodos() {
  var todos = loadFromStorage('todoDB');
  if (todos && todos.length) {
    gTodos = todos;
  } else {
    addTodo('Learn HTML', 2);
    addTodo('Master CSS', 1);
    addTodo('Practive JS', 3);
  }
}

function _makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return txt;
}
