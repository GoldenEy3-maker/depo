import Swiper from "swiper/bundle";
import { initTelMask } from "./tel-mask";
import { initContactsMap, initContactsSidebarToggling } from "./contacts";
import { handleSubmitForm } from "./forms-handler";

new Swiper("[data-projects-slider]", {
  loop: false,
  slidesPerView: 1,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

initTelMask();
initContactsSidebarToggling();
initContactsMap();

document.addEventListener("submit", handleSubmitForm);
