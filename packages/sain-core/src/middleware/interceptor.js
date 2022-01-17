import axios from "axios";
import urlAddons from "../utils/urlAddons";

export default (app) => {
  const { developmentMode, siteId } = app;
  axios.interceptors.request.use((config) => {
    const url = config.url.replace("{siteId}", developmentMode ? siteId : themeDisplay.getScopeGroupId());
    return {
      ...config,
      url: developmentMode ? url : new URL(url).origin !== location.origin ? url : urlAddons(url),
    };
  });
};
