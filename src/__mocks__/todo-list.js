import Todo from '../modules/todo.js';

class Todolist {
  constructor(todos) {
    this.todos = todos;
  }

  add(newTask) {
    this.index = this.todos.length + 1;
    this.newTodo = new Todo(this.index, newTask, false);
    this.todos.push(this.newTodo);
  }

  edit(updateTodo) {
    this.todos[updateTodo.index - 1].description = updateTodo.description;
  }

  remove(todo) {
    this.todos.splice(todo.index - 1, 1);
    this.resetTodos();
  }

  complete(todo) {
    this.todos[todo.index - 1].completed = true;
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.resetTodos();
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