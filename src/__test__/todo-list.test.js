import Todolist from '../modules/todo-list.js';
import Todo from '../modules/todo.js';
import store from '../__mocks__/store.js';

jest.mock('../modules/todo-list.js');

let todos = [];

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

const mockRemoveCompleted = jest.fn(() => {
  todos = todos.filter((todo) => !todo.completed);
  store.setItem('todos', todos);
});

const mockSortedTodos = jest.fn(() => todos.sort((a, b) => a.index - b.index));

const mockResetTodos = jest.fn(() => {
  todos.forEach((todo, index) => {
    todo.index = index + 1;
  });
});

Todolist.mockImplementation(() => ({
  add: mockAdd,
  remove: mockRemove,
  edit: mockEdit,
  complete: mockComplete,
  sortedTodos: mockSortedTodos,
  resetTodos: mockResetTodos,
  removeCompleted: mockRemoveCompleted,
}));

const todoList = new Todolist(todos);

describe('Test todo list', () => {
  test('Add new item to todolist and store', () => {
    todoList.add('Add new task');
    expect(todos).toHaveLength(1);
    expect(store.getItem('todos')).toHaveLength(1);
  });

  test('Add another item to todolist and store', () => {
    todoList.add('Add item 2');
    expect(todos).toHaveLength(2);
    expect(store.getItem('todos')).toHaveLength(2);
  });

  test('Add another item to todolist and store', () => {
    todoList.add('Add item 3');
    expect(todos).toHaveLength(3);
    expect(store.getItem('todos')).toHaveLength(3);
  });

  test('Remove an item from todolist and store', () => {
    todoList.remove(0);
    expect(todos).toHaveLength(2);
    expect(store.getItem('todos')).toHaveLength(2);
  });

  test('Reset todo list indexes', () => {
    todoList.resetTodos();
    expect(todos[0].index).toEqual(1);
    expect(todos[1].index).toEqual(2);
  });

  test('Remove another item from todolist and store', () => {
    todoList.remove(0);
    expect(todos).toHaveLength(1);
    expect(store.getItem('todos')).toHaveLength(1);
  });

  test('Reset todo list indexes', () => {
    todoList.resetTodos();
    expect(todos[0].index).toEqual(1);
  });

  test('Edit first item of todo list and store', () => {
    const updatedDescription = 'Updated description';
    todoList.edit(0, updatedDescription);
    expect(todos[0].description).toEqual('Updated description');
    expect(store.getItem('todos')[0].description).toEqual('Updated description');
  });

  test('Mark first item of todo list and store as completed', () => {
    todoList.complete(0);
    expect(todos[0].completed).toBeTruthy();
    expect(todos[0].completed).toEqual(true);
    expect(store.getItem('todos')[0].completed).toBeTruthy();
    expect(store.getItem('todos')[0].completed).toEqual(true);
  });

  test('Clear all completed todos from todo list and store', () => {
    todoList.removeCompleted();
    expect(todos).toHaveLength(0);
    expect(store.getItem('todos')).toHaveLength(0);
  });
});