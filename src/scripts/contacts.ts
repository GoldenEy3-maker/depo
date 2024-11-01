import ymaps3, { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import Swiper from "swiper/bundle";
import { z } from "zod";
import { SelectorsMap } from "./constants";
import { getAttrFromSelector } from "./helpers";

const contactsSlider = new Swiper(SelectorsMap.ContactsSlider, {
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
  const sidebar = document.querySelector(SelectorsMap.ContactsSidebar);

  if (!sidebar) return;

  sidebar.ariaExpanded = "true";
}

export function initCloseContactsSidebarHander() {
  const closeTrigger = document.querySelector<HTMLElement>(
    SelectorsMap.ContactsSidebarCloseTrigger,
  );
  const sidebar = document.querySelector<HTMLElement>(
    SelectorsMap.ContactsSidebar,
  );

  if (!sidebar || !closeTrigger) return;

  closeTrigger.addEventListener("click", () => {
    sidebar.ariaExpanded = "false";

    const markers = document.querySelectorAll<HTMLElement>(
      SelectorsMap.ContactsMapMarkerTrigger,
    );

    if (markers.length)
      markers.forEach((marker) => (marker.ariaCurrent = "false"));
  });
}

export async function initContactsMap() {
  const container = document.querySelector<HTMLElement>(
    SelectorsMap.ContactsMap,
  );
  const contactsSlidesWithMapMarker = document.querySelectorAll<HTMLElement>(
    SelectorsMap.ContactsSlidesWithMapMarker,
  );

  if (!container) return;

  const LOCATION: YMapLocationRequest = {
    center: [83.75866, 53.351807],
    zoom: 13,
  };

  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(
    container,
    {
      location: LOCATION,
      theme: "dark",
    },
    [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})],
  );

  if (contactsSlidesWithMapMarker.length)
    contactsSlidesWithMapMarker.forEach((node, index) => {
      const markerDataAttr = node.getAttribute(
        getAttrFromSelector(SelectorsMap.ContactsSlidesWithMapMarker),
      );

      if (!markerDataAttr) return;

      const markerData = parseMarkerData(markerDataAttr);

      const button = document.createElement("button");
      const img = document.createElement("img");

      button.setAttribute(
        getAttrFromSelector(SelectorsMap.ContactsMapMarkerTrigger),
        "",
      );
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
        "bg-primary",
        "aria-[current=true]:bg-text-foreground",
        "focus:outline-none",
        "focus-visible:ring",
        "focus-visible:ring-primary",
      );
      button.ariaCurrent =
        index === contactsSlider.activeIndex ? "true" : "false";

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

  const mapMarkers = document.querySelectorAll<HTMLElement>(
    SelectorsMap.ContactsMapMarkerTrigger,
  );

  if (mapMarkers.length)
    contactsSlider.on("slideChange", (swiper) => {
      mapMarkers.forEach((trigger, index) => {
        trigger.ariaCurrent = "false";

        if (swiper.activeIndex === index) {
          trigger.ariaCurrent = "true";

          const markerDataAttr = swiper.slides[swiper.activeIndex].getAttribute(
            SelectorsMap.ContactsSlidesWithMapMarker,
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
