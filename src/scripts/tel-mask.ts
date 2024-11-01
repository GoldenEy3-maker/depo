import IMask from "imask";

export function initTelMask() {
  const inputs = document.querySelectorAll<HTMLInputElement>("input[type=tel]");

  if (inputs.length)
    inputs.forEach((input) => {
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
