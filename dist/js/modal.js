async function sendToTelegram(data) {
  // Получить через BotFather после создания своего бота
  const BOT_TOKEN = "8210013170:AAE3QXgeha5qciWOoh5ysQss_4s3YrpuIk0";
  // Получить через @userinfobot
  const CHAT_ID = "7323779144";

  const message = `
🚁 Новая заявка Let's Fly!

👤 Имя: ${data.name}
📧 Email: ${data.email}
⏰ Время: ${new Date(data.timestamp).toLocaleString("ru-RU")}
    `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    );

    if (response.ok) {
      alert("Application sent!");
    } else {
      alert("Sending error");
    }
  } catch (e) {
    console.error(e);
    alert("Error network");
  }
}

const modal = document.getElementById("modal");
const overlay = modal.querySelector(".modal__overlay");

const openButton = document.getElementById("open-modal-button");
const closeButton = document.getElementById("close-modal-button");

const form = document.getElementById("application-form");

function openModal() {
  modal.classList.add("modal--active");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    form.querySelector("input[type=text]").focus();
  }, 300);
}

function closeModal() {
  modal.classList.remove("modal--active");
  document.body.style.overflow = "";
  form.reset(); // Clear inputs
}

async function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const data = {
    name,
    email,
    timestamp: new Date().toISOString(),
  };

  await sendToTelegram(data);

  setTimeout(() => {
    closeModal();
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  form.addEventListener("submit", handleSubmit);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal--active")) {
      closeModal();
    }
  });
});
