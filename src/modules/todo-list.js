import DomMenupulater from './dom-menupulator.js';
import Storage from './store.js';
import Todo from './todo.js';

class Todolist {
  constructor(todos) {
    this.todos = todos;
    this.todosContainer = document.getElementById('todos-container');
    this.clearBtn = document.getElementById('clear-btn');
    this.form = document.getElementById('todo-form');
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.clearBtn.addEventListener('click', this.removeCompleted.bind(this));
    DomMenupulater.displayTodos(this.todosContainer, this.sortedTodos());
  }

  handleSubmit(e) {
    e.preventDefault();
    this.task = this.form.task.value;
    this.add(this.task);
    e.target.reset();
  }

  add(newTask) {
    this.index = this.todos.length + 1;
    this.newTodo = new Todo(this.index, newTask, false);
    this.todos.push(this.newTodo);
    DomMenupulater.displayTodos(this.todosContainer, this.sortedTodos());
    Storage.save(this.todos);
  }

  edit(updateTodo) {
    this.todos[updateTodo.index - 1].description = updateTodo.description;
    Storage.save(this.todos);
  }

  remove(todo) {
    this.todos.splice(todo.index - 1, 1);
    this.resetTodos();
    Storage.save(this.todos);
  }

  complete(todo) {
    this.todos[todo.index - 1].completed = true;
    Storage.save(this.todos);
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.resetTodos();
    DomMenupulater.displayTodos(this.todosContainer, this.sortedTodos());
    Storage.save(this.todos);
  }

  sortedTodos() {
    return this.todos.sort((a, b) => a.index - b.index);
  }

  resetTodos() {
    this.todos.forEach((todo, index) => {
      todo.index = index + 1;
    });
  }
}

export default Todolist;