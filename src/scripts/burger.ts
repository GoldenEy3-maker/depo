import { SelectorMap } from "./constants";
import { lockScroll, unlockScroll } from "./utils";

export function initBurger() {
  const trigger = document.querySelector(SelectorMap.BurgerTrigger);

  if (!trigger) return;

  const burger = document.querySelector(SelectorMap.Burger);

  if (!burger) return;

  trigger.addEventListener("click", () => {
    const isHidden = burger.ariaHidden === "true";
    trigger.ariaCurrent = String(isHidden);
    burger.ariaHidden = isHidden ? "false" : "true";
    if (isHidden) lockScroll();
    else unlockScroll(300);
  });
}
