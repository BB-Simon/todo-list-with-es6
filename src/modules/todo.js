class Todo {
  constructor(todos) {
    this.todos = todos;
  }

  sortedTodos() {
    return this.todos.sort((a, b) => a.index - b.index);
  }

  draw(todo) {
    this.li = document.createElement('li');
    this.li.classList.add('todo-list-item');

    this.infoDiv = document.createElement('div');
    this.infoDiv.classList.add('item-info');
    this.checkIcon = document.createElement('i');
    this.checkIcon.className = 'fa-regular fa-square check-icon';
    this.descriptionSpan = document.createElement('span');
    this.descriptionSpan.classList.add('todo-task');
    this.descriptionSpan.innerText = todo.description;
    this.infoDiv.appendChild(this.checkIcon);
    this.infoDiv.appendChild(this.descriptionSpan);

    this.ellipsisDiv = document.createElement('div');
    this.ellipsIcon = document.createElement('i');
    this.ellipsIcon.className = 'fa-solid fa-ellipsis-vertical ellipsis-icon';
    this.ellipsisDiv.appendChild(this.ellipsIcon);

    this.li.appendChild(this.infoDiv);
    this.li.appendChild(this.ellipsisDiv);

    return this.li;
  }
}

export default Todo;