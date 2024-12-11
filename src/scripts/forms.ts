import { SelectorMap } from "./constants";
import { z } from "zod";

function generateResolver(input: HTMLInputElement) {
  let parser = z.string({
    required_error: input.required ? "Обязательное поле" : undefined,
  });

  if (input.pattern) {
    parser = parser.regex(
      new RegExp(`^(?:${input.pattern})$`),
      input.getAttribute("data-pattern-text") ?? undefined,
    );
  }

  if (input.minLength !== undefined && input.minLength !== -1) {
    parser = parser.min(
      input.minLength,
      `Минимальное количество символов поля ${input.minLength}`,
    );
  }

  return parser;
}

function validateField(
  input: HTMLInputElement,
  resolver: z.ZodString,
  messageContainer?: HTMLParagraphElement | null,
) {
  const result = resolver.safeParse(
    input.value !== "" ? input.value : undefined,
  );

  if (result.error) {
    input.ariaInvalid = "true";
    if (messageContainer)
      messageContainer.textContent = result.error?.flatten().formErrors[0];
    return false;
  }

  input.ariaInvalid = "false";
  if (messageContainer) messageContainer.textContent = "";
  return true;
}

function validateForm(
  form: HTMLFormElement,
  watchCallback?: (isValid: boolean) => void,
) {
  const controls = form.querySelectorAll<HTMLDivElement>(
    SelectorMap.FormControl,
  );

  let isValid = true;

  controls.forEach((control) => {
    const input = control.querySelector<HTMLInputElement>("input");
    const messageContainer = control.querySelector<HTMLParagraphElement>(
      SelectorMap.FormControlMessage,
    );

    if (!input) return;

    const resolver = generateResolver(input);

    isValid = validateField(input, resolver, messageContainer);
    input.addEventListener("input", () => {
      isValid = validateField(input, resolver, messageContainer);
      watchCallback?.(
        form.querySelector(
          `${SelectorMap.FormControl} input[aria-invalid=true]`,
        )
          ? false
          : true,
      );
    });
  });

  return isValid;
}

export function handleSubmitForm(event: SubmitEvent) {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  const isValid = validateForm(target);

  // const successOverlay = document.querySelector<HTMLElement>(
  //   `[data-form-success=${target.id}]`,
  // );

  const unknowErrorMessage = target.getAttribute("data-unknown-error-message");
  const responseContainer = target.querySelector<HTMLParagraphElement>(
    "[data-form-response]",
  );

  if (!isValid) return;

  const formData = target.method !== "get" ? new FormData(target) : undefined;

  for (let i = 0; i < target.elements.length; i++) {
    (target.elements[i] as HTMLInputElement | HTMLButtonElement).disabled =
      true;
  }

  if (responseContainer) {
    responseContainer.textContent = "";
    responseContainer.ariaHidden = "true";
  }

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
        if (responseContainer) {
          responseContainer.textContent =
            unknowErrorMessage ?? "Что-то пошло не так!";
          responseContainer.ariaHidden = "false";

          setTimeout(() => {
            responseContainer.textContent = "";
            responseContainer.ariaHidden = "true";
          }, 2000);
        }
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
      if (responseContainer) {
        responseContainer.textContent = error;
        responseContainer.ariaHidden = "false";
        setTimeout(() => {
          responseContainer.textContent = "";
          responseContainer.ariaHidden = "true";
        }, 2000);
      }
      console.error(error);
    })
    .finally(() => {
      for (let i = 0; i < target.elements.length; i++) {
        target.elements[i].removeAttribute("disabled");
      }
    });
}
