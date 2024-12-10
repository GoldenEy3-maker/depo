import { SelectorMap } from "./constants";
import { getAttrFromSelector, lockScroll, unlockScroll } from "./utils";

export function initDialog() {
  const triggers = document.querySelectorAll(SelectorMap.DialogTrigger);

  if (triggers.length)
    triggers.forEach((trigger) => {
      const dialogKey = trigger.getAttribute(
        getAttrFromSelector(SelectorMap.DialogTrigger),
      );

      if (!dialogKey) return;

      const dialog = document.querySelector<HTMLDialogElement>(`#${dialogKey}`);

      if (!dialog) return;

      const closes = dialog.querySelectorAll(SelectorMap.DialogClose);

      if (closes.length)
        closes.forEach((close) => {
          close.addEventListener("click", () => {
            dialog?.close();
          });
        });

      dialog.addEventListener("pointerdown", (event) => {
        const { currentTarget, target } = event;
        if (currentTarget === target) dialog.close();
      });

      dialog.addEventListener("close", () => {
        unlockScroll(300);
      });

      trigger.addEventListener("click", () => {
        dialog.showModal();
        lockScroll();
      });
    });
}
