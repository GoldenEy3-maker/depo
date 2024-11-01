import { SelectorsMap } from "./constants";
import { initContactsMap } from "./contacts";
import { getAttrFromSelector } from "./helpers";

export function initLazyLoading() {
  const YmapsMap = {
    [SelectorsMap.ContactsMap]: initContactsMap,
  };

  function initLazyYmap(intersectingTarget: HTMLElement) {
    Object.entries(YmapsMap).forEach(([selector, initializator]) => {
      if (intersectingTarget.closest(selector)) initializator();
    });
  }

  const LazyCallbacksMap: Record<
    string,
    [IntersectionObserver, (el: HTMLElement) => void]
  > = {
    [SelectorsMap.LazyLoadingImg]: [
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLImageElement;
              const src = target.getAttribute(
                getAttrFromSelector(SelectorsMap.LazyLoadingImg),
              )!;
              target.src = src;
              observer.unobserve(target);
            }
          });
        },
        {
          rootMargin: "100px",
        },
      ),
      (el) =>
        ((el as HTMLImageElement).src = el.getAttribute(
          getAttrFromSelector(SelectorsMap.LazyLoadingImg),
        )!),
    ],
    [SelectorsMap.LazyLoadingMap]: [
      new IntersectionObserver((entries, obsever) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            initLazyYmap(target);
            obsever.unobserve(target);
          }
        });
      }),
      (el) => initLazyYmap(el),
    ],
  };

  Object.entries(LazyCallbacksMap).forEach(([selector, handlers]) => {
    document
      .querySelectorAll<HTMLImageElement>(selector)
      .forEach((el) =>
        "IntersectionObserver" in window
          ? handlers[0].observe(el)
          : handlers[1](el),
      );
  });
}
