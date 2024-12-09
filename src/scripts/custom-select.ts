import Choices from "choices.js";
import { SelectorMap } from "./constants";

export function initCustomSelect() {
  new Choices(SelectorMap.CustomSelect, {
    removeItemButton: false,
    searchEnabled: false,
    itemSelectText: "",
    shouldSort: false,
  });
}
