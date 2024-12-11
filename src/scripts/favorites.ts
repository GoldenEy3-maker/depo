import { SelectorMap } from "./constants";
import { getAttrFromSelector } from "./utils";

export function initFavorites() {
  const items = document.querySelectorAll<HTMLElement>(
    SelectorMap.ApartmentItem,
  );
  const store: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  const sortFavoritesTrigger = document.querySelector(
    SelectorMap.FavoritesSort,
  );

  if (items.length) {
    sortFavoritesTrigger?.addEventListener("click", () => {
      const store: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      );
      const isCurrent = sortFavoritesTrigger.ariaCurrent === "true";

      items.forEach((item) => {
        const id = item.getAttribute(
          getAttrFromSelector(SelectorMap.ApartmentItem),
        );
        if (!id) return;

        if (isCurrent) {
          item.style.removeProperty("display");
          item.ariaHidden = "false";
          sortFavoritesTrigger.ariaCurrent = "false";
        } else {
          if (!store.includes(id)) {
            item.style.display = "none";
            item.ariaHidden = "true";
          }
          sortFavoritesTrigger.ariaCurrent = "true";
        }
      });
    });

    items.forEach((item) => {
      const id = item.getAttribute(
        getAttrFromSelector(SelectorMap.ApartmentItem),
      );
      if (!id) return;
      const favoriteActionTrigger = item.querySelector(
        SelectorMap.FavoriteAction,
      );

      if (store.includes(id))
        favoriteActionTrigger?.setAttribute("aria-current", "true");

      favoriteActionTrigger?.addEventListener("click", () => {
        const store: string[] = JSON.parse(
          localStorage.getItem("favorites") || "[]",
        );

        const isCurrent = favoriteActionTrigger.ariaCurrent === "true";

        if (isCurrent) {
          localStorage.setItem(
            "favorites",
            JSON.stringify(store.filter((i) => i !== id)),
          );
          favoriteActionTrigger.ariaCurrent = "false";
        } else {
          store.push(id);
          localStorage.setItem("favorites", JSON.stringify(store));
          favoriteActionTrigger.ariaCurrent = "true";
        }
      });
    });
  }
}
