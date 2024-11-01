import Swiper from "swiper/bundle";
import { initTelMask } from "./tel-mask";
import { initCloseContactsSidebarHander } from "./contacts";
import { handleSubmitForm } from "./forms-handler";
import { SelectorsMap } from "./constants";
import { initLazyLoading } from "./lazy-loading";

initLazyLoading();

new Swiper(SelectorsMap.ProjectsSlider, {
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
