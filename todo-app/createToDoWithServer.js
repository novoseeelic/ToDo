import { getTodoList, createTodoItemServer, deleteTodoItem, switchTodoItemDone, createToDoItemByAPI } from "./useApi.js";
import { createTodoItem, createAppTitle, createTodoItemform, createTodoList, makeItemReady, deleteItem } from "./view.js";

export async function createTodoItem(container, title = "Список дел", owner) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemform();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  // получаем данные с сервера
  let dataItemList = await getTodoList(owner)
  dataItemList.forEach(itemObject => {
    createToDoItemByAPI(todoList, itemObject)
  })

  // браузер создает событие submit на форме по нажатию  на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener("submit", async function(e) {
    e.preventDefault();
    // игнорируем создание элемента, если пользователь ничего не ввел в поле
    if (!todoItemForm.input.value) {
        return;
    }

    let itemObject = await createTodoItemServer(todoItemForm.input.value, owner)

    const todoItemElement = createTodoItem(itemObject);
    todoList.append(todoItemElement.item);

    deleteItem(todoItemElement.deleteButton, todoItemElement.item, itemObject, deleteTodoItem);
    makeItemReady(todoItemElement.doneButton, todoItemElement.item, itemObject, switchTodoItemDone);


    todoItemForm.input.value = "";
    todoItemForm.button.disabled = true;
  });
}