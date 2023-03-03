/**
 * @jest-environment jsdom
 */

import DomMenupulator from '../modules/dom-menupulator.js';

jest.mock('../modules/dom-menupulator.js');

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
      + '  <ul id="list"></ul>'
      + '</div>';
    const list = document.querySelector('#list');
    const childList = list.children;
    expect(childList).toHaveLength(0);
  });
});