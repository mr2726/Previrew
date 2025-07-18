document.addEventListener('DOMContentLoaded', () => {
    const paper = document.querySelector('.paper');
    const button = document.querySelector('.button');
    let isOpen = false;

    function openEnvelope() {
        if (!isOpen) {
            // Анимация подъема
            paper.style.transform = 'translate(-50%, -200%) scale(0.2)';

            setTimeout(() => {
                // Анимация раскрытия
                // paper.style.left = '50%';
                paper.style.transform = 'translate(-50%, 0) scale(1)';
                paper.style.top = '0';
                isOpen = true;
            }, 2000);
        }
    }

    function closeEnvelope() {
        if (isOpen) {
            // Анимация закрытия
            paper.style.transform = 'translate(-50%, -50%) scale(0.2)';
            paper.style.top = '50%';
            isOpen = false;
        }
    }

    button.addEventListener('click', openEnvelope);
    // Опционально: добавить возможность закрытия по клику на бумагу
    paper.addEventListener('click', closeEnvelope);
});


const clickon = document.querySelector(".envelope");
const openConv = document.querySelector(".envelope__open");
const paper = document.querySelector(".paper");

clickon.addEventListener("click", () => {
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
  openConv.style.animation = "openFlapHalf 0.6s forwards";
  setTimeout(() => {
    paper.style.animation = " paperAnimation 0.6s forwards";
  }, 500);
});

const inputValue = document.querySelector("#last_info__input"); 
const sendButton = document.querySelector("#btn");

// Вставь свой токен и chat_id ниже
const BOT_TOKEN = '7615109323:AAHvzOudg2FWHzVkoTbGuLPU0yZrUtFpYHE';
const CHAT_ID = '-1002780698494';

sendButton.addEventListener("click", () => {
    const message = inputValue.value.trim();
    if (message !== "") {
        // Отправка сообщения в Telegram
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: "New guest: " + message
            })
        })
        .then(response => {
            if (response.ok) {
                // alert("✅ Сообщение отправлено!");
                inputValue.value = "";
            } else {
                alert("❌ Ошибка при отправке сообщения.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("⚠️ Не удалось отправить сообщение.");
        });
    } else {
        alert("Մուտքագրեք ձեր անունը և ազգանունը");
    }
});