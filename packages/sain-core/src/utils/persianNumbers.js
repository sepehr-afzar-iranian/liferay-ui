var persianNumbersInterval = false;
export const numbers = { 0: "۰", 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹" };
export function traverse(element) {
  if (element.nodeType == 3) {
    const list = element.data.match(/[0-9]/g);
    if (list != null && list.length != 0)
      for (let i = 0; i < list.length; i++) element.data = element.data.replace(list[i], numbers[list[i]]);
  }

  for (let i = 0; i < element.childNodes.length; i++) {
    const { tagName } = element.childNodes[i];
    if (tagName !== "STYLE" && tagName !== "SCRIPT") traverse(element.childNodes[i]);
  }
}
export default function persianNumbers() {
  if (persianNumbersInterval === false) persianNumbersInterval = setInterval(() => traverse(document.body), 1000);
}
