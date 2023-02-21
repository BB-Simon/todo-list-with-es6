import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import DomMenupulator from './modules/dom-menupulator.js';
import Todolist from './modules/todo-list.js';
import Storage from './modules/store.js';

window.addEventListener('load', () => {
  const data = Storage.get();
  const todoList = new Todolist(data);
  (() => new DomMenupulator(todoList))();
});