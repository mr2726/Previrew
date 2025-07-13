document.addEventListener("DOMContentLoaded", () => {
  const paper = document.querySelector(".paper");
  if (!paper) return;

  // Удаляем анимацию paperScale до переноса
  // paper.style.animation = "paperAnimation 2s forwards 4s";

  paper.addEventListener("animationend", (event) => {
    if (event.animationName === "paperAnimation") {
      // Получаем координаты центра блока
      const rect = paper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Переносим в body
      document.body.appendChild(paper);
      // Фиксируем позицию относительно окна, чтобы центр совпал
      paper.style.position = "fixed";
      paper.style.left = (centerX - paper.offsetWidth / 2) + "px";
      paper.style.top = (centerY - paper.offsetHeight / 2) + "px";
      paper.style.transform = "scale(0.2)";
      // Запускаем анимацию paperScale только после переноса
      setTimeout(() => {
        paper.style.animation = "paperScale 1s forwards";
      }, 10);
    }
  });
});

const clickon = document.querySelector(".envelope");
const openConv = document.querySelector(".envelope__open");
const paper = document.querySelector(".paper");

clickon.addEventListener("click", () => {
  openConv.style.animation = "openFlapHalf 2s forwards";
  setTimeout(() => {
    paper.style.animation = " paperAnimation 2s forwards 4s, paperScale 1s forwards 6s";
  });
});