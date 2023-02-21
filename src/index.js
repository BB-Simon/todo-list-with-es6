import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import Todo from './modules/todo.js';
import todos from './modules/store.js';

class Todolist extends Todo {
  constructor(todos) {
    super(todos);
    this.todosContainer = document.getElementById('todos-container');
  }

  displayTodos() {
    this.todosContainer.innerHTML = '';
    this.sortedTodos().forEach((todo) => {
      const list = this.draw(todo);
      this.todosContainer.appendChild(list);
    });
  }
}

window.addEventListener('load', () => {
  const todoList = new Todolist(todos);
  todoList.displayTodos();
});