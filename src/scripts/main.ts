import Swiper from "swiper/bundle";
import { initTelMask } from "./tel-mask";
import { initCloseContactsSidebarHander } from "./contacts";
import { handleSubmitForm } from "./forms";
import { SelectorMap } from "./constants";
import { initLazyLoading } from "./lazy-loading";

initLazyLoading();

new Swiper(SelectorMap.ProjectsSlider, {
  loop: false,
  slidesPerView: 1,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper(SelectorMap.ProjectSlider, {
  loop: false,
  slidesPerView: 1,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

initCloseContactsSidebarHander();
initTelMask();

document.addEventListener("submit", handleSubmitForm);
