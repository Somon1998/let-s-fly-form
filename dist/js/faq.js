const CLASS_ITEM_OPEN = "faq__item--open";

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq__item");

  items.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains(CLASS_ITEM_OPEN);

      /* Если нужен режим, открыт только один */
      items.forEach((i) => {
        i.classList.remove(CLASS_ITEM_OPEN);
        i.querySelector(".faq__answer").style.display = "none";
      });

      if (!isOpen) {
        item.classList.add(CLASS_ITEM_OPEN);
        answer.style.display = "block";
      }
    });
  });
});
