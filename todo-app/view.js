import { saveListInLocalStorage, loadListFromLocalStorage, createToDoItemByLocalStorage } from "./useLocalStorage.js";
import { getTodoList, createTodoItemServer, createToDoItemByAPI } from "./useApi.js";
import { switchMode } from "./switchMode.js";
  
  //создаем и возвращаем заголовок приложения
  export function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дел
  export function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');
    
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-appen');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;
    
    //Доступность кнопки
    input.addEventListener('input', function() {
      if (input.value !== "") {
        button.disabled = false;
    } else {
        button.disabled = true;
      };
    });
    
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    
    return {
      form,
      input,
      button,
    };
  }

  //создаем и возвращаем список элементов
  export function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };
  
  export function createTodoItem(todoItem) {
    let item = document.createElement('li');
    
    //кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    //устанавливаем стили для элемета списка, а также для размещения кнопок в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    
    if (todoItem.done == true) {
      item.classList.add("list-group-item-success");
    }

    //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item, 
      doneButton, 
      deleteButton};
  }

  //Формируем id для элемента
  export function getId(arrObj) {
     if (arrObj.length === 0) {
       let id = 1;
       return id;
     } else {
       var id = 0;
       for (let i = 0; i <= arrObj.length - 1; i++) {
         if (arrObj[i].id > id) {
           id = arrObj[i].id
         }
       }
       return id + 1;
     }
  };

  //сохраняем данные в localStorage
  export function setData(key, arrObj) {
    localStorage.setItem(key, JSON.stringify(arrObj));
  }

// глобальные функции по событию клика на кнопки
export function makeItemReady(button, item, itemObject, fn, arr, title) {
  button.addEventListener('click', function () {
    item.classList.toggle('list-group-item-success');
    if (arr != undefined) {
      for (let item of arr) {
        if (item.id == itemObject.id) {
          itemObject.done = !itemObject.done;
        }
      }
      fn(arr, title);
    } else {
      fn(itemObject);
    }
  })
}

export function deleteItem(button, item, itemObject, fn, arr, title) {
  button.addEventListener('click', function () {
    if (confirm('Вы уверены?')) {
      item.remove();
      if (arr != undefined) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == itemObject.id) {
            arr.splice(i, 1);
          }
        }
       fn(arr, title);
      } else {
        fn(itemObject);
      }
    }
  })
}
  
  export async function createTodoApp(conteiner, {title, owner}) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    
    conteiner.append(todoAppTitle);
    conteiner.append(todoItemForm.form);
    conteiner.append(todoList);

    //задаем переменную для массива обьектов из локального хранилища
    let arrItemObjects = [];

    let checkMode = switchMode();

    if (checkMode === 'server') {
      // загрузка данных с сервера
      let dataItemList = await getTodoList(owner);

      // отрисовка дел на основе полученных данных с СЕРВЕРА
      dataItemList.forEach(itemObject => {
        createToDoItemByAPI(todoList, itemObject)
      })
    } else {
      arrItemObjects = loadListFromLocalStorage(title);

      // отрисовка на основе данных из LocalStorage
      for (let itemObject of arrItemObjects) {
        createToDoItemByLocalStorage(todoList, itemObject, arrItemObjects, title)
      }
    }
    
    //браузер создает событие submit на форме по нажатию на enter или на кнопку создания тела
    todoItemForm.form.addEventListener('submit', async function(e) {
      //эта строчка необходима, чтобы предотвратить стандартное действие браузера
      //в данном случае мы не хотим, чтоюы страница перегружалась при отправке формы
      e.preventDefault();
      
      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      };
      
      if (checkMode === 'server') {
        const itemObject = await createTodoItemServer(owner, todoItemForm.input.value);
        createToDoItemByAPI(todoList, itemObject)
      } else {
        let itemObject = {
          id: getId(arrItemObjects),
          name: todoItemForm.input.value,
          done: false,
        };

        arrItemObjects.push(itemObject);

        saveListInLocalStorage(arrItemObjects, title)
        createToDoItemByLocalStorage(todoList, itemObject, arrItemObjects, title)
      }

      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;

    })
  };