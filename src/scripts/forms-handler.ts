import { SelectorsMap } from "./constants";

function validateFormSubmit(event: SubmitEvent) {
  const controls = (
    event.currentTarget as HTMLFormElement
  ).querySelectorAll<HTMLDivElement>(SelectorsMap.FormControl);

  let isValid = true;

  function validateRequired(
    target: HTMLInputElement,
    messageContainer: HTMLParagraphElement | null,
  ) {
    if (target.value === "") {
      isValid = false;
      if (messageContainer) messageContainer.textContent = "Обязательное поле";
      target.ariaInvalid = "true";
    } else {
      if (messageContainer) messageContainer.textContent = "";
      target.ariaInvalid = "false";
    }
  }

  function validatePattern(
    target: HTMLInputElement,
    messageContainer: HTMLParagraphElement | null,
  ) {
    if (!target.value && target.required) return;

    if (!new RegExp(`^(?:${target.pattern})$`).test(target.value)) {
      isValid = false;
      if (messageContainer)
        messageContainer.textContent = target.dataset.patternText ?? null;
      target.ariaInvalid = "true";
    } else {
      if (messageContainer) messageContainer.textContent = "";
      target.ariaInvalid = "false";
    }
  }

  if (controls.length)
    controls.forEach((control) => {
      const input = control.querySelector<HTMLInputElement>("input");
      const messageContainer = control.querySelector<HTMLParagraphElement>(
        SelectorsMap.FormControlMessage,
      );

      if (input?.required) {
        validateRequired(input, messageContainer);
        input.addEventListener("input", () =>
          validateRequired(input, messageContainer),
        );
      }

      if (input?.pattern) {
        validatePattern(input, messageContainer);
        input.addEventListener("input", () =>
          validatePattern(input, messageContainer),
        );
      }
    });

  return isValid;
}

export function handleSubmitForm(event: SubmitEvent) {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  const isValid = validateFormSubmit(event);

  // const successOverlay = document.querySelector<HTMLElement>(
  //   `[data-form-success=${target.id}]`,
  // );

  // const unknowInvalidResponse = target.getAttribute(
  //   "data-unknown-invalid-response",
  // );
  // const responseEl = target.querySelector<HTMLParagraphElement>(
  //   "[data-form-response]",
  // );

  if (!isValid) return;

  const formData = target.method !== "get" ? new FormData(target) : undefined;

  for (let i = 0; i < target.elements.length; i++) {
    (target.elements[i] as HTMLInputElement | HTMLButtonElement).disabled =
      true;
  }

  // if (responseEl) {
  //   responseEl.textContent = "";
  //   responseEl.ariaHidden = "true";
  // }

  fetch(target.action, {
    method: target.method,
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "response status",
          response.url,
          response.status,
          response.statusText,
        );
        // if (responseEl) {
        //   responseEl.textContent =
        //     unknowInvalidResponse ?? "Что-то пошло не так!";
        //   responseEl.ariaHidden = "false";
        // }
        return;
      }

      /* if (successOverlay) {
        successOverlay.ariaHidden = "false";
        successOverlay.style.height = target.offsetHeight + "px";
        target.ariaHidden = "true";

        setTimeout(() => {
          successOverlay.ariaHidden = "true";
          target.ariaHidden = "false";
        }, 5000);
      } else  if (responseEl)
        responseEl.textContent = "Заявка отправлена успешно!";
        */
      target.reset();
    })
    .catch((error) => {
      // if (responseEl) {
      //   responseEl.textContent = error;
      //   responseEl.ariaHidden = "false";
      // }
      console.error(error);
    })
    .finally(() => {
      for (let i = 0; i < target.elements.length; i++) {
        target.elements[i].removeAttribute("disabled");
      }
    });
}
