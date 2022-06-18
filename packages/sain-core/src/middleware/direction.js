import persianNumbers from "../utils/persianNumbers";

export function direction(locale, developmentMode) {
  const rtl_langs = ["fa", "ar", "iw", "ur"],
    root = document.getElementsByTagName("html")[0],
    dir = rtl_langs.includes(locale) ? "rtl" : "ltr";

  if (dir === "rtl") persianNumbers();

  if (developmentMode) {
    root.className += ` ${dir}`;
    return dir;
  } else {
	  return  (Liferay.Language && Liferay.Language.direction) ? Liferay.Language.direction[themeDisplay.getLanguageId()] : "rtl";
  }
}
