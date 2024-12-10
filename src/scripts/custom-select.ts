import Choices from "choices.js";
import { SelectorMap } from "./constants";

export function initCustomSelect() {
  const selects = document.querySelectorAll(SelectorMap.CustomSelect);
  if (selects.length)
    selects.forEach((select) => {
      new Choices(select, {
        removeItemButton: false,
        searchEnabled: false,
        itemSelectText: "",
        shouldSort: false,
      });
    });
}
