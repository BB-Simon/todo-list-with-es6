import DomMenupulater from './dom-menupulator.js';
import Storage from './store.js';
import Todo from './todo.js';

class Todolist {
  constructor(todos) {
    this.todos = todos;
    this.sortedTodos = this.todos.sort((a, b) => a.index - b.index);
    this.todosContainer = document.getElementById('todos-container');
    this.form = document.getElementById('todo-form');
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    DomMenupulater.displayTodos(this.todosContainer, this.sortedTodos);
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
    DomMenupulater.displayTodos(this.todosContainer, this.sortedTodos);
    Storage.save(this.todos);
  }

  edit(updateTodo) {
    this.todos.forEach((todo) => {
      if (todo.index === updateTodo.index) {
        todo.description = updateTodo.description;
      }
    });
    Storage.save(this.todos);
  }

  remove(todo) {
    this.todos.splice(todo.index - 1, 1);
    this.todos.forEach((todo, index) => {
      todo.index = index + 1;
    });
    Storage.save(this.todos);
  }
}

export default Todolist;