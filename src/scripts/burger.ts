import { SelectorMap } from "./constants";

export function initBurger() {
  const trigger = document.querySelector(SelectorMap.BurgerTrigger);

  if (!trigger) return;

  const burger = document.querySelector(SelectorMap.Burger);

  if (!burger) return;

  trigger.addEventListener("click", () => {
    trigger.ariaCurrent = String(burger.ariaHidden === "true");
    burger.ariaHidden = burger.ariaHidden === "true" ? "false" : "true";
  });
}
