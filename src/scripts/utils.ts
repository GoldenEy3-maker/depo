export function getAttrFromSelector(selector: string) {
  return selector.replace(/^\[|\]/g, "");
}

export function parseJSONWithQuotes(value: string) {
  return JSON.parse(value.replace(/&quot;/gi, '"'));
}
