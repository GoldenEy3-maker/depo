import ymaps3, { LngLat, YMapLocationRequest } from "@yandex/ymaps3-types";
import Swiper from "swiper/bundle";
import { z } from "zod";
import { SelectorMap } from "./constants";
import { getAttrFromSelector, parseJSONWithQuotes } from "./utils";

const contactsSlider = new Swiper(SelectorMap.ContactsSlider, {
  loop: false,
  slidesPerView: 1,
  speed: 600,
});

const MarkerDataSchema = z.object({
  coordinates: z.custom<LngLat>(),
  img: z.string(),
  target: z.custom<HTMLButtonElement>().optional(),
});

let _activeMapMarker: HTMLButtonElement | null = null;

function parseMarkerData(value: string) {
  return MarkerDataSchema.parse(parseJSONWithQuotes(value));
}

function openContactsSidebar() {
  const sidebar = document.querySelector(SelectorMap.ContactsSidebar);

  if (!sidebar) return;

  sidebar.ariaExpanded = "true";
}

export function initCloseContactsSidebarHander() {
  const closeTrigger = document.querySelector<HTMLElement>(
    SelectorMap.ContactsSidebarCloseTrigger,
  );
  const sidebar = document.querySelector<HTMLElement>(
    SelectorMap.ContactsSidebar,
  );

  if (!sidebar || !closeTrigger) return;

  closeTrigger.addEventListener("click", () => {
    sidebar.ariaExpanded = "false";

    if (_activeMapMarker) {
      _activeMapMarker.ariaCurrent = "false";
      _activeMapMarker = null;
    }
  });
}

export async function initContactsMap() {
  const container = document.querySelector<HTMLElement>(
    SelectorMap.ContactsMap,
  );
  const contactsSlidesWithMapMarker = Array.from(
    document.querySelectorAll<HTMLElement>(
      SelectorMap.ContactsSlidesWithMapMarker,
    ),
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

  const markersData = contactsSlidesWithMapMarker.reduce<
    z.infer<typeof MarkerDataSchema>[]
  >((acc, slide, index) => {
    const isActiveButton = index === contactsSlider.activeIndex;

    const markerDataAttr = slide.getAttribute(
      getAttrFromSelector(SelectorMap.ContactsSlidesWithMapMarker),
    )!;

    const markerData = parseMarkerData(markerDataAttr);

    const button = document.createElement("button");
    const img = document.createElement("img");

    button.setAttribute(
      getAttrFromSelector(SelectorMap.ContactsMapMarkerTrigger),
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

    button.ariaCurrent = isActiveButton ? "true" : "false";

    if (isActiveButton) _activeMapMarker = button;

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

    markerData.target = button;

    acc.push(markerData);

    return acc;
  }, []);

  contactsSlider.on("slideChange", (swiper) => {
    const activeIndex = swiper.activeIndex;
    const coordinates = markersData[activeIndex].coordinates;
    const markerTarget = markersData[activeIndex].target;

    if (markerTarget) {
      if (_activeMapMarker) _activeMapMarker.ariaCurrent = "false";
      markerTarget.ariaCurrent = "true";
      _activeMapMarker = markerTarget;
    }

    map.setLocation({
      center: coordinates,
      duration: 600,
    });
  });
}
