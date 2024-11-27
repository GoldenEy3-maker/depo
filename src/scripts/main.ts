import Swiper from "swiper/bundle";
import { initTelMask } from "./tel-mask";
import { initCloseContactsSidebarHander } from "./contacts";
import { handleSubmitForm } from "./forms";
import { SelectorMap } from "./constants";
import { initLazyLoading } from "./lazy-loading";

initLazyLoading();

new Swiper(SelectorMap.ProjectsSlider, {
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper(SelectorMap.ProjectSlider, {
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const projectFeaturesSliderPhoto = new Swiper(
  SelectorMap.ProjectFeaturesSliderPhoto,
  {
    speed: 600,
    navigation: {
      nextEl: SelectorMap.PorjectFeaturesSliderButtonNext,
      prevEl: SelectorMap.PorjectFeaturesSliderButtonPrev,
    },
  },
);

const projectFeaturesSliderText = new Swiper(
  SelectorMap.ProjectFeaturesSliderText,
  {
    speed: 600,
    autoHeight: true,
  },
);

projectFeaturesSliderPhoto.controller.control = projectFeaturesSliderText;
projectFeaturesSliderText.controller.control = projectFeaturesSliderPhoto;

const projectBlueprintsThumbs = new Swiper(
  SelectorMap.PorjectBlueprintsThumbs,
  {
    slidesPerView: "auto",
  },
);

const projectBlueprintsTabSlider = new Swiper(
  SelectorMap.PorjectBlueprintsTabSlider,
  {
    speed: 600,
    simulateTouch: false,
    thumbs: {
      swiper: projectBlueprintsThumbs,
    },
  },
);

const projectBlueprintsSlider = new Swiper(
  SelectorMap.PorjectBlueprintsSlider,
  {
    speed: 600,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    nested: true,
  },
);

initCloseContactsSidebarHander();
initTelMask();

document.addEventListener("submit", handleSubmitForm);
