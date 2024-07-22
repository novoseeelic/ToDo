import { saveListInLocalStorage, loadListFromLocalStorage, createToDoItemByLocalStorage } from "./useLocalStorage.js";
import { createTodoItem, createAppTitle, createTodoItemform, createTodoList, makeItemReady, deleteItem, getId } from "./view.js";

// функция приложения, использующая локальное хранилище
export function createToDoWithLocalStorage(container, title = "Список дел", listName) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemform();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  // получаем массив дел из данных локального хранилища
  let arrItemObjects = loadListFromLocalStorage(listName)
  for (let itemObject of arrItemObjects) {
    createToDoItemByLocalStorage(todoList, itemObject, arrItemObjects, listName)
  }

  todoItemForm.form.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (!todoItemForm.input.value) {
        return;
    }

    let itemObject = {
        id: getId(arrItemObjects),
        name: todoItemForm.input.value,
        done: false,
    };

    let todoItem = createTodoItem(itemObject);
    arrItemObjects.push(itemObject);

    saveListInLocalStorage(arrItemObjects, listName);

    todoList.append(todoItem.item);

    makeItemReady(todoItem.doneButton, todoItem.item, itemObject, saveListInLocalStorage, arrItemObjects, listName);
    deleteItem(todoItem.deleteButton, todoItem.item, itemObject, saveListInLocalStorage, arrItemObjects, listName);

    todoItemForm.input.value = "";
    todoItemForm.button.disabled = true;
  });
}