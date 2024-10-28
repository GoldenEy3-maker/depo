import Swiper from "swiper/bundle";

new Swiper("[data-projects-slider]", {
  loop: false,
  slidesPerView: 1,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
