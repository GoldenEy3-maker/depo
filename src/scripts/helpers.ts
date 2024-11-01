export function getAttrFromSelector(selector: string) {
  return selector.replace(/^\[|\]/g, "");
}
