  // //создаем и возвращаем заголовок приложения
  //function createAppTitle(title) {
  //   let appTitle = document.createElement('h2');
  //   appTitle.innerHTML = title;
  //   return appTitle;
  //}
  
  // //создаем и возвращаем форму для создания дел
  // function createTodoItemForm() {
  //   let form = document.createElement('form');
  //   let input = document.createElement('input');
  //   let buttonWrapper = document.createElement('div');
  //   let button = document.createElement('button');
    
  //   form.classList.add('input-group', 'mb-3');
  //   input.classList.add('form-control');
  //   input.placeholder = 'Введите название нового дела';
  //   buttonWrapper.classList.add('input-group-appen');
  //   button.classList.add('btn', 'btn-primary');
  //   button.textContent = 'Добавить дело';
  //   button.disabled = true;
    
  //   //Доступность кнопки
  //   input.addEventListener('input', function() {
  //     if (input.value !== "") {
  //       button.disabled = false;
  //   } else {
  //       button.disabled = true;
  //     };
  //   });
    
  //   buttonWrapper.append(button);
  //   form.append(input);
  //   form.append(buttonWrapper);
    
  //   return {
  //     form,
  //     input,
  //     button,
  //   };
  // }
  
  // //создаем и возвращаем список элементов
  // function createTodoList() {
  //   let list = document.createElement('ul');
  //   list.classList.add('list-group');
  //   return list;
  // };
  
  // function createTodoItem(todoItem, {onDone, OnDelete}) {
  //   let item = document.createElement('li');
    
  //   //кнопки помещаем в элемент, который красиво покажет их в одной группе
  //   let buttonGroup = document.createElement('div');
  //   let doneButton = document.createElement('button');
  //   let deleteButton = document.createElement('button');

  //   //устанавливаем стили для элемета списка, а также для размещения кнопок в его правой части с помощью flex
  //   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  //   item.textContent = todoItem.name;

  //   buttonGroup.classList.add('btn-group', 'btn-group-sm');
  //   doneButton.classList.add('btn', 'btn-success');
  //   doneButton.textContent = 'Готово';
  //   deleteButton.classList.add('btn', 'btn-danger');
  //   deleteButton.textContent = 'Удалить';
    
  //   if (todoItem.done == true) {
  //     item.classList.add("list-group-item-success");
  //   }
    
  //   //добавляем обработчики на кнопки
  //   doneButton.addEventListener('click', function() {
  //     onDone({todoItem, element: item});
  //     item.classList.toggle('list-group-item-success', todoItem.done);
  //   });

  //   deleteButton.addEventListener('click', function() {
  //     OnDelete({todoItem, element: item});
  //    });

  //   //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  //   buttonGroup.append(doneButton);
  //   buttonGroup.append(deleteButton);
  //   item.append(buttonGroup);

  //   return item;
  // }
  
  // async function createTodoApp(conteiner, title, owner) {
  //   let todoAppTitle = createAppTitle(title);
  //   let todoItemForm = createTodoItemForm();
  //   let todoList = createTodoList();
  //   const handlers = {
  //     onDone(todoItem) {
  //       todoItem.todoItem.done = !todoItem.todoItem.done;
  //       fetch(`http://localhost:3000/api/todos/${todoItem.todoItem.id}`, {
  //         method: "PATCH",
  //         body: JSON.stringify({done: todoItem.todoItem.done}),
  //         headers: {
  //           "Content-Type" : "application/json",
  //         }
  //       });
  //     },
  //     OnDelete({todoItem, element}) {
  //       if (confirm('Вы уверены?')) {
  //         element.remove();
  //         fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
  //         method: "DELETE",
  //       });
  //       }
  //     },
  //   };
    
  //   conteiner.append(todoAppTitle);
  //   conteiner.append(todoItemForm.form);
  //   conteiner.append(todoList);

  //   const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  //   const todoItemList = await response.json();

  //   todoItemList.forEach(todoItem => {
  //     const todoItemElement = createTodoItem(todoItem, handlers);
  //     todoList.append(todoItemElement);
  //   });
    
  //   //браузер создает событие submit на форме по нажатию на enter или на кнопку создания тела
  //   todoItemForm.form.addEventListener('submit', async function(e) {
  //     //эта строчка необходима, чтобы предотвратить стандартное действие браузера
  //     //в данном случае мы не хотим, чтоюы страница перегружалась при отправке формы
  //     e.preventDefault();
      
  //     //игнорируем создание элемента, если пользователь ничего не ввел в поле
  //     if (!todoItemForm.input.value) {
  //       return;
  //     };

  //     const response = await fetch("http://localhost:3000/api/todos", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: todoItemForm.input.value.trim(),
  //         owner,
  //       }),
  //       headers: {
  //         "Content-Type" : "application/json",
  //       }
  //     });

  //     const todoItem = await response.json(); 
      
  //     let todoItemElement = createTodoItem(todoItem, handlers);
      
  //     //создаем и добавляем в список новое дело с названием из поля для ввода
  //     todoList.append(todoItemElement);
      
  //     //обнуляем значение в поле, чтобы не пришлось стирать его вручную
  //     todoItemForm.input.value = '';
  //     todoItemForm.button.disabled = true;
  //   })
  // };
  
  import { createTodoApp } from "./todo-app/view.js";

  export { createTodoApp }