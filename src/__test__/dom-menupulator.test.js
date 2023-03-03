/**
 * @jest-environment jsdom
 */

describe('Test todo list at DOM', () => {
  test('Add a new li to the ul', () => {
    document.body.innerHTML = '<div>'
      + '  <ul id="list"></ul>'
      + '</div>';
    const list = document.querySelector('#list');
    const li = document.createElement('li');
    li.innerText = 'New item';
    list.appendChild(li);
    const childList = list.children;
    expect(childList).toHaveLength(1);
  });

  test('Remove a li from the ul', () => {
    document.body.innerHTML = '<div>'
      + '  <ul id="list"><li id="item1">Item 1</li></ul>'
      + '</div>';
    const list = document.querySelector('#list');
    const item1 = document.querySelector('#item1');
    list.removeChild(item1);
    const childList = list.children;
    expect(childList).toHaveLength(0);
  });
});