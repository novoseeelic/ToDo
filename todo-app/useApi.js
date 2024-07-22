import { createTodoItem, deleteItem, makeItemReady } from "./view.js";

export async function getTodoList(owner) {
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
}

export async function createTodoItemServer(owner, name) {
    const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        body: JSON.stringify({
          name,
          owner,
        }),
        headers: {
          "Content-Type" : "application/json",
        }
      });

    return await response.json(); 
}

export function switchTodoItemDone(todoItem) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: "PATCH",
        body: JSON.stringify({done: todoItem.done}),
        headers: {
            "Content-Type" : "application/json",
        }
    });
}

export function deleteTodoItem(todoItem) {
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: "DELETE",
  });
}

// функция создания элемента дела и добавление его в разметку со связью с API (сохранение/удаление дела)
export function createToDoItemByAPI(todoList, itemObject) {
  const todoItemElement = createTodoItem(itemObject);
  todoList.append(todoItemElement.item);

  deleteItem(todoItemElement.deleteButton, todoItemElement.item, itemObject, deleteTodoItem);
  makeItemReady(todoItemElement.doneButton, todoItemElement.item, itemObject, switchTodoItemDone);
}