// функция смены режима использования хранилища (серверное или локальное)
export function switchMode () {
  let switchBtn = document.getElementById("switch-btn");
  let checkMode = sessionStorage.getItem("myKey");
  if (checkMode === "server") {
    switchBtn.textContent= "Перейти на локальное хранилище";
  } else {
    switchBtn.textContent= "Перейти на серверное хранилище";
  }

  switchBtn.addEventListener("click", function() {
    if (switchBtn.textContent === "Перейти на серверное хранилище") {
        sessionStorage.setItem("myKey", "server");
        location.reload();
      } else {
        sessionStorage.setItem("myKey", "localStorage");
        location.reload();
      }
    });
  return checkMode;
}