class DomMenupulator {
  constructor(todos) {
    DomMenupulator.todoList = todos;
  }

  static todoList;

  static editing = false;

  static displayTodos(domEle, todos) {
    domEle.innerHTML = '';
    todos.forEach((todo) => {
      const list = this.draw(todo);
      domEle.appendChild(list);
    });
  }

  static draw(todo) {
    this.li = document.createElement('li');
    this.li.classList.add('todo-list-item');

    this.li.addEventListener('click', this.enableEditing.bind({
      li: this.li,
      todo,
    }));

    this.infoDiv = document.createElement('div');
    this.infoDiv.classList.add('item-info');

    // Check icon
    this.checkIcon = document.createElement('span');
    this.checkIcon.className = 'check-icon';
    this.sqr = document.createElement('i');
    this.sqr.className = 'fa-regular fa-square';
    this.checkIcon.appendChild(this.sqr);

    // Mark icon
    this.markIcon = document.createElement('i');
    this.markIcon.className = 'fa-solid fa-check mark-icon';

    this.descriptionSpan = document.createElement('span');
    this.descriptionSpan.classList.add('todo-task');
    this.descriptionSpan.innerText = todo.description;

    // Edit input
    this.editInput = document.createElement('input');
    this.editInput.type = 'text';
    this.editInput.classList.add('edit-input');

    this.infoDiv.appendChild(this.checkIcon);
    this.infoDiv.appendChild(this.markIcon);
    this.infoDiv.appendChild(this.descriptionSpan);
    this.infoDiv.appendChild(this.editInput);

    // ellips icon
    this.ctaDiv = document.createElement('div');
    this.ctaDiv.classList.add('action-cta');

    this.ellipsIcon = document.createElement('i');
    this.ellipsIcon.className = 'fa-solid fa-ellipsis-vertical ellipsis-icon';

    // trush icon
    this.trushIcon = document.createElement('span');
    this.trushIcon.className = 'trush-icon';
    this.tr = document.createElement('i');
    this.tr.className = 'fa-regular fa-trash-can';
    this.trushIcon.appendChild(this.tr);
    this.trushIcon.addEventListener('click', this.delet.bind({ li: this.li, todo }));

    this.ctaDiv.appendChild(this.ellipsIcon);
    this.ctaDiv.appendChild(this.trushIcon);

    this.li.appendChild(this.infoDiv);
    this.li.appendChild(this.ctaDiv);

    return this.li;
  }

  static enableEditing(e) {
    if (this.editing) {
      return;
    }
    e.stopPropagation();
    this.editing = true;
    this.li.classList.add('item-editing');
    this.infoDiv = this.li.children[0].children;
    this.ctaDiv = this.li.children[1].children;

    this.infoDiv[2].style.display = 'none';
    this.ctaDiv[0].style.display = 'none';

    this.infoDiv[3].style.display = 'block';
    this.infoDiv[3].focus();
    this.ctaDiv[1].style.display = 'block';

    const val = this.infoDiv[2].innerText;
    this.infoDiv[3].value = val;

    this.infoDiv[3].addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        const newValue = e.target.value;
        this.todo.description = newValue;
        this.infoDiv[2].innerText = newValue;
        this.li.classList.remove('item-editing');
        this.infoDiv[2].style.display = 'block';
        this.ctaDiv[0].style.display = 'block';
        DomMenupulator.todoList.edit(this.todo);
        this.infoDiv[3].style.display = 'none';
        this.ctaDiv[1].style.display = 'none';
        this.editing = false;
      }
    });
  }

  static delet(e) {
    e.stopPropagation();
    DomMenupulator.todoList.todosContainer.removeChild(this.li);
    DomMenupulator.todoList.remove(this.todo);
  }
}

export default DomMenupulator;