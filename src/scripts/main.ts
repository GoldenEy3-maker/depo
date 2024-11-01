import Swiper from "swiper/bundle";
import { initTelMask } from "./tel-mask";
import { initContactsMap, initCloseContactsSidebarHander } from "./contacts";
import { handleSubmitForm } from "./forms-handler";
import { SelectorsMap } from "./constants";

new Swiper(SelectorsMap.ProjectsSlider, {
  loop: false,
  slidesPerView: 1,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

initTelMask();
initCloseContactsSidebarHander();
initContactsMap();

document.addEventListener("submit", handleSubmitForm);
