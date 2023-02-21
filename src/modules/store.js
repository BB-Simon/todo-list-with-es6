import Todo from './todo.js';

class Storage {
  static get() {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (Array.isArray(this.todos) && this.todos.length) {
      return this.todos.map((todo) => new Todo(todo.index, todo.description, todo.completed));
    }
    return [];
  }

  static save(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export default Storage;