import { LngLat, YMap } from "@yandex/ymaps3-types";

export function getAttrFromSelector(selector: string) {
  return selector.replace(/^\[|\]/g, "");
}

export function parseJSONWithQuotes(value: string) {
  return JSON.parse(value.replace(/&quot;/gi, '"'));
}

export function setYMapLocation(
  map: YMap,
  center: LngLat,
  duration: number = 600,
) {
  map.setLocation({ center, duration });
}
