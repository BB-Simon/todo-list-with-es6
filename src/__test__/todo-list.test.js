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

Todolist.mockImplementation(() => ({
  add: mockAdd,
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
});