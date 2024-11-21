import IMask from "imask";
import { SelectorMap } from "./constants";

export function initTelMask() {
  const inputs = document.querySelectorAll<HTMLInputElement>(
    SelectorMap.TelMaskInput,
  );

  if (inputs.length)
    inputs.forEach((input) => {
      // IMask(input, {
      //   mask: [
      //     {
      //       mask: "+{7} (000) 000-00-00",
      //     },
      //     {
      //       mask: "s@d.w",
      //       blocks: {
      //         s: { mask: /(?!\d)[a-zA-Z0-9._-]/ },
      //         d: { mask: /[a-zA-Z._-]/ },
      //         w: { mask: /[a-zA-Z._-]/ },
      //       },
      //     },
      //   ],
      //   prepare: (appended, masked) => {
      //     if (appended === "8" && masked.value === "") {
      //       return "+7 (";
      //     }
      //     return appended;
      //   },
      // });
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
        prepare: (appended, masked) => {
          if (appended === "8" && masked.value === "") {
            return "+7 (";
          }
          return appended;
        },
      });
    });
}
