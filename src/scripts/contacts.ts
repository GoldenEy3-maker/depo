import ymaps3, { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import Swiper from "swiper/bundle";
import { z } from "zod";

const contactsSlider = new Swiper("[data-contacts-slider]", {
  loop: false,
  slidesPerView: 1,
  speed: 600,
});

function parseMarkerData(value: string) {
  const schema = z.object({
    coordinates: z.custom<LngLat>(),
    img: z.string(),
  });

  return schema.parse(JSON.parse(value.replace(/&quot;/gi, '"')));
}

function openContactsSidebar() {
  const triggers = document.querySelectorAll("[data-contacts-sidebar-toggler]");
  const sidebar = document.querySelector("[data-contacts-sidebar]");

  if (!sidebar || triggers.length === 0) return;

  triggers.forEach((trigger) => (trigger.ariaExpanded = "true"));
  sidebar.ariaExpanded = "true";
}

export function initContactsSidebarToggling() {
  const triggers = document.querySelectorAll("[data-contacts-sidebar-toggler]");
  const sidebar = document.querySelector("[data-contacts-sidebar]");

  if (!sidebar || triggers.length === 0) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen =
        sidebar.ariaExpanded === "true" || sidebar.ariaExpanded === null;
      sidebar.ariaExpanded = isOpen ? "false" : "true";

      triggers.forEach(
        (trigger) => (trigger.ariaExpanded = isOpen ? "false" : "true"),
      );
    });
  });
}

export async function initContactsMap() {
  const contactsMap = document.getElementById("contacts-map");
  const contactsMapElements = document.querySelectorAll<HTMLElement>(
    "[data-contacts-map-marker]",
  );

  if (!contactsMap) return;

  const LOCATION: YMapLocationRequest = {
    center: [83.75866, 53.351807],
    zoom: 13,
  };

  const MarkerStateMap = {
    Active: "bg-text-foreground",
    Default: "bg-primary",
  } as const;

  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(
    contactsMap,
    {
      location: LOCATION,
      theme: "dark",
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})],
  );

  if (contactsMapElements.length)
    contactsMapElements.forEach((node, index) => {
      const markerDataAttr = node.getAttribute("data-contacts-map-marker");

      if (!markerDataAttr) return;

      const markerData = parseMarkerData(markerDataAttr);

      const button = document.createElement("button");
      const img = document.createElement("img");

      button.setAttribute("data-contacts-map-marker-trigger", "");
      button.type = "button";

      button.classList.add(
        "relative",
        "flex",
        "items-center",
        "justify-center",
        "~w-12/[4.875rem]",
        "~h-12/[4.875rem]",
        "~top-[-1.5rem]/[-2.4375rem]",
        "~left-[-1.5rem]/[-2.4375rem]",
        "~p-1/2",
        "focus:outline-none",
        "focus-visible:ring",
        "focus-visible:ring-primary",
      );
      button.classList.add(
        index === contactsSlider.activeIndex
          ? MarkerStateMap.Active
          : MarkerStateMap.Default,
      );

      img.src = markerData.img;
      img.classList.add("w-full", "h-full", "object-cover");

      button.append(img);

      button.addEventListener("click", () => {
        contactsSlider.slideTo(index);
        openContactsSidebar();
      });

      map.addChild(
        new YMapMarker(
          {
            coordinates: markerData.coordinates,
          },
          button,
        ),
      );
    });

  contactsSlider.on("slideChange", (swiper) => {
    document
      .querySelectorAll("[data-contacts-map-marker-trigger]")
      .forEach((trigger, index) => {
        trigger.classList.remove(MarkerStateMap.Active);
        trigger.classList.add(MarkerStateMap.Default);

        if (swiper.activeIndex === index) {
          trigger.classList.add(MarkerStateMap.Active);
          const markerDataAttr = swiper.slides[swiper.activeIndex].getAttribute(
            "data-contacts-map-marker",
          );

          if (!markerDataAttr) return;

          const markerData = parseMarkerData(markerDataAttr);

          map.setLocation({
            center: markerData.coordinates,
            duration: 600,
          });
        }
      });
  });
}
