//  выбора языка

let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  fetch(`./langs/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          el.textContent = data[key];
        }
      });
    });
}

setLanguage(currentLang);

// Обработка нажатия на кнопку выбора языка
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
    dropdown.hidden = true;
  });
});

// Показ / скрытие выпадающего списка
const toggle = document.querySelector(".lang-toggle");
const dropdown = document.querySelector(".lang-dropdown");
toggle.addEventListener("click", () => {
  dropdown.hidden = !dropdown.hidden;
});
