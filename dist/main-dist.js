const CLASS_ITEM_OPEN = "faq__item--open";
document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelectorAll(".faq__item");
  e.forEach((t) => {
    const s = t.querySelector(".faq__question"),
      n = t.querySelector(".faq__answer");
    s.addEventListener("click", () => {
      const s = t.classList.contains(CLASS_ITEM_OPEN);
      e.forEach((e) => {
        e.classList.remove(CLASS_ITEM_OPEN),
          (e.querySelector(".faq__answer").style.display = "none");
      }),
        s || (t.classList.add(CLASS_ITEM_OPEN), (n.style.display = "block"));
    });
  });
});
//# sourceMappingURL=main-dist.js.map
