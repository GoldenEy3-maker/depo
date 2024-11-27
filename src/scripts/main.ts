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

const projectFeaturesSliderPhoto = new Swiper(
  SelectorMap.ProjectFeaturesSliderPhoto,
  {
    loop: false,
    slidesPerView: 1,
    speed: 600,
  },
);

const projectFeaturesSliderText = new Swiper(
  SelectorMap.ProjectFeaturesSliderText,
  {
    loop: false,
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoHeight: true,
  },
);

projectFeaturesSliderPhoto.controller.control = projectFeaturesSliderText;
projectFeaturesSliderText.controller.control = projectFeaturesSliderPhoto;

const projectBlueprintsThumbs = new Swiper(
  SelectorMap.PorjectBlueprintsThumbs,
  {
    loop: false,
    slidesPerView: "auto",
  },
);

initCloseContactsSidebarHander();
initTelMask();

document.addEventListener("submit", handleSubmitForm);
