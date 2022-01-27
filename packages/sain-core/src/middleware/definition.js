import defaults from "../config/default";
import { configuration } from "./configuration";
import i18n from "../utils/replaceVariables";
import { direction } from "./direction";
import merge from "lodash/merge";

import authorization from "./authorization";


export function definitions(name, properties, configs) {
  const developmentMode = window.Liferay.Language.available ? false : true;
  let app = {
    id: Date.now() + String(Math.random()).substr(2),
    name,
    wrapperClassName: `portlet-wrapper ${name.replace(".", "-")}-wrapper`,
    developmentMode,
    i18n, // i18n Replace Variables
    ...defaults,
    ...properties,
  };

  if (developmentMode) {
    app.contextPath = `/o/${app.name}/`;
    app.configuration = configuration(app, configs.configuration);

    // const { default: override } = require(`../../../../packages/${app.name}/src/configs`);
    app = merge(app, configs);

    console.log(app);

    if (app.token.enable && developmentMode) {
      authorization(app);
    }
  } else app.siteId = themeDisplay.getScopeGroupId();

  app.direction = direction(app.locale, developmentMode);

  return app;
}
