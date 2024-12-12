import { Fancybox } from "@fancyapps/ui";
import { SelectorMap } from "./constants";
import { getAttrFromSelector, parseJSONWithQuotes } from "./utils";

export default function initGallery() {
  const galleries = document.querySelectorAll(SelectorMap.Gallery);

  if (galleries.length)
    galleries.forEach((gallery) => {
      const attrData = gallery.getAttribute(
        getAttrFromSelector(SelectorMap.Gallery),
      );

      if (!attrData) return;

      const data = parseJSONWithQuotes(attrData) as string[];

      console.log(data);

      gallery.addEventListener("click", () => {
        new Fancybox(data.map((url) => ({ src: url })));
      });
    });
}
