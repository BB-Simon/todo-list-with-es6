import Todolist from '../modules/todo-list.js';
import Todo from '../modules/todo.js';
import store from '../__mocks__/store.js';

jest.mock('../modules/todo-list.js');

const todos = [];

const mockAdd = jest.fn((newTask) => {
  const index = todos.length + 1;
  const newTodo = new Todo(index, newTask, false);
  todos.push(newTodo);
  store.setItem('todos', todos);
}); 

const mockRemove = jest.fn((index) => {
  todos.splice(index, 1);
  store.setItem('todos', todos);
});

const mockEdit = jest.fn((index, updatedDescription) => {
  todos[index].description = updatedDescription;
});

const mockComplete = jest.fn((index) => {
  todos[index].completed = true;
});

Todolist.mockImplementation(() => ({
  add: mockAdd,
  remove: mockRemove,
  edit: mockEdit,
  complete: mockComplete,
}));

describe('Test todo list', () => {
  test('Add new item to todolist and store', () => {
    const todoList = new Todolist(todos);
    todoList.add('Add new task');
    expect(todos).toHaveLength(1);
    expect(store.getItem('todos')).toHaveLength(1);
  });

  test('Add another item to todolist and store', () => {
    const todoList = new Todolist(todos);
    todoList.add('Add item 2');
    expect(todos).toHaveLength(2);
    expect(store.getItem('todos')).toHaveLength(2);
  });

  test('Remove an item from todolist and store', () => {
    const todoList = new Todolist(todos);
    todoList.remove(0);
    expect(todos).toHaveLength(1);
    expect(store.getItem('todos')).toHaveLength(1);
  });

  test('Remove another item from todolist and store', () => {
    const todoList = new Todolist(todos);
    todoList.remove(0);
    expect(todos).toHaveLength(0);
    expect(store.getItem('todos')).toHaveLength(0);
  });
});