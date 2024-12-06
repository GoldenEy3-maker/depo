import { SelectorMap } from "./constants";
import { getAttrFromSelector } from "./utils";

type InputsMap = Partial<
  Record<"min" | "max", Partial<Record<"number" | "range", HTMLInputElement>>>
>;

export function initRangeSlider() {
  const rangerSliders = document.querySelectorAll<HTMLElement>(
    SelectorMap.RangeSlider,
  );
  const minGap = 0;

  function updateTrack(track: HTMLElement, inputs: InputsMap) {
    let minPercents = 0;
    let maxPercents = 100;
    let min = 0;
    let max = 100;
    const minRange = inputs.min?.range;
    const maxRange = inputs.max?.range;

    if (minRange) {
      min = parseInt(minRange.min);
      max = parseInt(minRange.max);

      minPercents = ((minRange.valueAsNumber - min) / (max - min)) * 100;
    }

    if (maxRange) {
      min = parseInt(maxRange.min);
      max = parseInt(maxRange.max);

      maxPercents = ((maxRange.valueAsNumber - min) / (max - min)) * 100;
    }

    track.style.setProperty("--min-percents", minPercents + "%");
    track.style.setProperty("--max-percents", maxPercents + "%");
  }

  if (rangerSliders.length)
    rangerSliders.forEach((rangeSlider) => {
      const track = rangeSlider.querySelector<HTMLElement>(
        SelectorMap.RangeSliderTrack,
      );
      const inputs = Array.from(rangeSlider.querySelectorAll("input"));

      const inputsMap = inputs.reduce<InputsMap>((acc, input) => {
        const isMin =
          input.getAttribute(
            getAttrFromSelector(SelectorMap.RangeSliderMin),
          ) !== null;
        const isMax =
          input.getAttribute(
            getAttrFromSelector(SelectorMap.RangeSliderMax),
          ) !== null;

        if (isMin) {
          if ("min" in acc) acc.min![input.type] = input;
          else acc.min = { [input.type]: input };
        }

        if (isMax) {
          if ("max" in acc) acc.max![input.type] = input;
          else acc.max = { [input.type]: input };
        }

        return acc;
      }, {});

      if (track) updateTrack(track, inputsMap);

      rangeSlider.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;

        if (target.type === "number") {
          const isMin = inputsMap.min?.number === target;
          const isMax = inputsMap.max?.number === target;

          if (
            isMin &&
            inputsMap.max?.number?.value &&
            target.valueAsNumber > inputsMap.max.number.valueAsNumber
          ) {
            target.value = String(inputsMap.max.number.valueAsNumber);
          }

          if (
            isMax &&
            inputsMap.min?.number?.value &&
            target.valueAsNumber < inputsMap.min.number.valueAsNumber
          ) {
            target.value = String(inputsMap.min.number.valueAsNumber);
          }

          if (target.valueAsNumber > parseFloat(target.max)) {
            target.value = target.max;
          }

          if (target.valueAsNumber < parseFloat(target.min)) {
            target.value = target.min;
          }

          const range = inputsMap[isMin ? "min" : isMax ? "max" : ""]?.range;

          if (range) {
            if (target.value) {
              range.value = target.value;
            } else if (inputsMap.min?.range === range) {
              range.value = target.min;
            } else if (inputsMap.max?.range === range) {
              range.value = target.max;
            }

            if (track) updateTrack(track, inputsMap);
          }
        }
      });

      rangeSlider.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;

        if (target.type === "range") {
          const isMin = inputsMap.min?.range === target;
          const isMax = inputsMap.max?.range === target;

          if (isMin) {
            if (
              inputsMap.max?.range &&
              inputsMap.max.range.valueAsNumber - target.valueAsNumber <= minGap
            )
              target.value = String(inputsMap.max.range.valueAsNumber - minGap);
          }
          if (
            isMax &&
            inputsMap.min?.range &&
            target.valueAsNumber - inputsMap.min.range.valueAsNumber <= minGap
          ) {
            target.value = String(inputsMap.min.range.valueAsNumber + minGap);
          }

          const number = inputsMap[isMin ? "min" : isMax ? "max" : ""]?.number;

          if (number) number.value = target.value;
          if (track) updateTrack(track, inputsMap);
        }
      });
    });
}
