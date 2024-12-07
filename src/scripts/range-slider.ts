import noUiSlider from "nouislider";

export function initRangeSlider() {
  const sliders = document.querySelectorAll("[data-range-slider]");

  if (sliders.length)
    sliders.forEach((slider) => {
      const minInput = slider.querySelector<HTMLInputElement>(
        "[data-range-slider-min]",
      );
      const maxInput = slider.querySelector<HTMLInputElement>(
        "[data-range-slider-max]",
      );
      const ui = slider.querySelector<HTMLElement>("[data-range-slider-ui]");

      if (!minInput || !maxInput || !ui) return;

      const noUi = noUiSlider.create(ui, {
        start: [Number(minInput.min), Number(maxInput.max)],
        connect: true,
        range: {
          min: Number(minInput.min),
          max: Number(maxInput.max),
        },
        step: Number(minInput.step),
      });

      noUi.on("slide", (values) => {
        const [min, max] = values;

        minInput.value = Number(min).toFixed(
          minInput.step.split(".")[1]?.length ?? 0,
        );
        maxInput.value = Number(max).toFixed(
          maxInput.step.split(".")[1]?.length ?? 0,
        );
      });

      minInput.addEventListener("change", () => {
        if (
          minInput.value &&
          maxInput.value &&
          minInput.valueAsNumber > maxInput.valueAsNumber
        ) {
          minInput.value = maxInput.value;
        }

        if (minInput.valueAsNumber < Number(minInput.min)) {
          minInput.value = minInput.min;
        }

        if (minInput.value)
          noUi.set([minInput.valueAsNumber, maxInput.valueAsNumber]);
        else noUi.set([minInput.min, maxInput.valueAsNumber]);
      });

      maxInput.addEventListener("change", () => {
        if (
          maxInput.value &&
          minInput.value &&
          maxInput.valueAsNumber < minInput.valueAsNumber
        ) {
          maxInput.value = minInput.value;
        }

        if (maxInput.valueAsNumber > Number(maxInput.max)) {
          maxInput.value = maxInput.max;
        }

        if (maxInput.value)
          noUi.set([minInput.valueAsNumber, maxInput.valueAsNumber]);
        else noUi.set([maxInput.valueAsNumber, maxInput.max]);
      });
    });
}
