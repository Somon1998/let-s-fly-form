/* 
	Как работает start, end:
	- start: 'top bottom' - вверх элемента и низ окна совпали
	- start: 'top 80%' - вверх элемента и 80% окна совпали
	- start: '+=150%' - от текущей позиции скрола на 150% вниз

	- end: 'bottom top' - низ элемента и верх окна совпали
	- end: 'bottom 20%' - низ элемента и 20% окна совпали
	- end: '+=150%' - от текущей позиции скрола на 150% вниз
*/

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: false, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });

  // Чтобы браузер учитывал загруженные картинки
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  });

  ScrollTrigger.normalizeScroll(true);

  /* Add bg header when start scroll */
  const header = document.querySelector(".header");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      header.classList.toggle("header--scrolled", self.scroll() > 10);
    },
  });

  /* Якоря */
  document.querySelectorAll(".header__menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const target = document.getElementById(targetId);
      if (target) ScrollSmoother.get().scrollTo(target, true);
    });
  });

  /* Global */
  gsap.from(".fade-in", {
    y: -25,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.ease",
  });

  gsap.from(".right-fade-in", {
    x: 25,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.ease",
  });

  gsap.from(".zoom-in-fade-in", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.1,
    immediateRender: false,
  });

  /* Welcome section */
  const welcomePlane = ".welcome__plane";
  gsap.set(welcomePlane, { xPercent: -50, x: -5 * 12 });
  gsap.from(welcomePlane, {
    x: -140 - 5 * 12,
    y: 50,
    duration: 1.5,
    ease: "power3.ease",
    immediateRender: false,
  });

  // Scroll animation
  const welcomeTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".welcome",
      start: "top top",
      end: "+=120%",
      scrub: true,
    },
  });

  welcomeTl
    .to(".zoom-in-fade-in", { scale: 0.8, opacity: 0, ease: "none" }, 0)
    .to(welcomePlane, { x: 250, y: -50 }, 0);

  /* Mission section */
  const mission = ".mission";

  gsap.utils.toArray(`${mission} > div`).forEach((item) => {
    gsap.fromTo(
      item,
      { y: 25, scale: 0.7, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
          end: "bottom 55%",
          scrub: true,
          // Без этого иногда применяется анимация изначальная до скрола
          immediateRender: false,
        },
      }
    );
  });

  /* Luxury */
  gsap.fromTo(
    "#luxury > .container",
    { scale: 0.9, opacity: 0, x: -100 },
    {
      scale: 1,
      opacity: 1,
      x: -10,
      ease: "none",
      scrollTrigger: {
        trigger: "#luxury",
        start: "top 80%",
        end: "+=70%",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  gsap.fromTo(
    ".luxury-flights__image",
    { scale: 0.9, x: 150, opacity: 0.7 },
    {
      x: -300,
      scale: 1.2,
      top: -10,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".luxury-flights__image",
        start: "top 45%",
        end: "+=100%",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  /* Loyalty */
  gsap.fromTo(
    ".loyalty .loyalty__top",
    { scale: 0.9, opacity: 0, x: 100 },
    {
      scale: 1,
      opacity: 1,
      x: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".loyalty",
        start: "top 80%",
        end: "+=80%",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  gsap.fromTo(
    ".loyalty .loyalty__bottom",
    { scale: 0.9, opacity: 0, x: -100 },
    {
      scale: 1,
      opacity: 1,
      x: -10,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".loyalty .loyalty__bottom",
        start: "top bottom", // блок только зашёл в экран
        end: "top center", // достиг центра
        scrub: true,
        immediateRender: false,
      },
    }
  );

  gsap.fromTo(
    ".loyalty__image",
    { scale: 0.9, x: -100 },
    {
      x: 250,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: ".loyalty__image",
        start: "top bottom", // картинка вошла в экран
        end: "bottom top", // картинка полностью вышла
        scrub: true,
        immediateRender: false,
      },
    }
  );

  /* Costs */
  gsap.fromTo(
    ".costs__bottom-right",
    { scale: 0.9, opacity: 0, x: 100 },
    {
      scale: 1,
      opacity: 1,
      x: 10,
      ease: "none",
      scrollTrigger: {
        trigger: ".costs__bottom-right",
        start: "top 85%",
        end: "top 45%",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  gsap.fromTo(
    ".costs__bottom-left",
    { scale: 0.9, opacity: 0, x: -100 },
    {
      scale: 1,
      opacity: 1,
      x: -10,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".costs__bottom-left",
        start: "top 85%",
        end: "top 45%",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  gsap.fromTo(
    ".costs__image",
    { scale: 0.9, x: -450, y: -50 },
    {
      x: 150,
      y: 50,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: ".costs__image",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
      },
    }
  );

  /* Apply section */
  gsap.utils.toArray(".apply__empty, .apply__card").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 16, scale: 0.85, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
          immediateRender: false,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  /* Faq section */
  gsap.fromTo(
    ".faq__container",
    { y: 16, scale: 0.85, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq",
        start: "top 90%",
        end: "top 40%",
        scrub: true,
        immediateRender: false,
        invalidateOnRefresh: true,
      },
    }
  );

  // Optimization for performance
  gsap.set(
    [
      ".welcome",
      ".welcome__plane",
      "#luxury > .container",
      ".luxury-flights__image",
      ".loyalty .loyalty__top",
      ".loyalty .loyalty__bottom",
      ".loyalty__image",
      ".costs__bottom-left",
      ".costs__bottom-right",
      ".costs__image",
      ".apply__empty",
      ".apply__card",
      ".faq__container",
    ],
    {
      force3D: true,
      transformPerspective: 1000,
      backfaceVisibility: "hidden",
    }
  );

  // Ensure that the ScrollTrigger is refreshed after the content is loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());
});
