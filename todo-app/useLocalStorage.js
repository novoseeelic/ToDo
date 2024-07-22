import { createTodoItem, deleteItem, makeItemReady } from "./view.js";

// функция сохранения данных в локальное хранилище
export function saveListInLocalStorage(arroy, title) {
  localStorage.setItem(title, JSON.stringify(arroy));
}

// функция получения данных из локульного хранилища
export function loadListFromLocalStorage(title) {
  let arrItemObjects = [];
  let datatitle = localStorage.getItem(title);
  if (datatitle !== null) {
    arrItemObjects = JSON.parse(datatitle);
  }
  return arrItemObjects;
}

// функция создания элемента дела и добавление его в разметку со связью с localStorage (сохранение/удаление дела)
export function createToDoItemByLocalStorage(todoList, itemObject, arrItemObjects, title) {
  const todoItemElement = createTodoItem(itemObject);
  todoList.append(todoItemElement.item);

  makeItemReady(todoItemElement.doneButton, todoItemElement.item, itemObject, saveListInLocalStorage, arrItemObjects, title);
  deleteItem(todoItemElement.deleteButton, todoItemElement.item, itemObject, saveListInLocalStorage, arrItemObjects, title);
}