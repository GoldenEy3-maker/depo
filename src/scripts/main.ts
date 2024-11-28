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
      nextEl: SelectorMap.ProjectFeaturesSliderButtonNext,
      prevEl: SelectorMap.ProjectFeaturesSliderButtonPrev,
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
  SelectorMap.ProjectBlueprintsThumbs,
  {
    slidesPerView: "auto",
  },
);

new Swiper(SelectorMap.ProjectBlueprintsTabSlider, {
  speed: 600,
  simulateTouch: false,
  thumbs: {
    swiper: projectBlueprintsThumbs,
  },
});

new Swiper(SelectorMap.ProjectBlueprintsSlider, {
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  nested: true,
});

new Swiper(SelectorMap.ProjectConstructionProgressSlider, {
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

initCloseContactsSidebarHander();
initTelMask();

document.addEventListener("submit", handleSubmitForm);
