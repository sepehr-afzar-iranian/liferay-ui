import React, { Fragment } from "react";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "@sainui/context";

import Markups from "./plugins/Markups/index";
import ErrorBoundary from "./plugins/ErrorBoundry/index";
import ModalContainer from "./plugins/ModalContainer/index";
import ToastContainer from "./plugins/ToastContainer/index";
import ResponsiveWidget from "./plugins/ResponsiveWidget/index";
import ResponseInterceptors from "./plugins/ResponseInterceptors/index";
import TranslateYup from "./plugins/TranslateYup/index";
import Debug from "./plugins/Debug/index";

import Router from "./router/index";
import interceptor from "./middleware/interceptor";
import reparation from "./middleware/reparation";
import { definitions } from "./middleware/definition";
export { definitions };

// import "./styles/reset.css";

export default function index({ app, routes, children: Container }) {
  const { developmentMode, direction, markups, locale } = app;
  if (developmentMode) {
    const internationalization = require(developmentMode
      ? "./middleware/internationalization"
      : "./middleware/internationalization");
    internationalization.default(app);

    require(direction === "rtl" ? "./styles/liferay/rtl.css" : "./styles/liferay/ltr.css");
    require(direction === "rtl" ? "./styles/liferay/aui.rtl.css" : "./styles/liferay/aui.ltr.css");
    // require(direction === "rtl" ? "./styles/development/rtl.css" : "./styles/development/ltr.css");
  }
  interceptor(app);

  reparation();

  const PortletMarkups = developmentMode && markups ? Markups : Fragment;
  return (
    <ErrorBoundary eventHandlerErrors={app.catchErrorsInEventHandler}>
      <MemoryRouter>
        <StoreProvider value={{ app }}>
          <PortletMarkups>
            <Container>
              <Router app={app} routes={routes} />
            </Container>
            <ModalContainer />
            <ToastContainer />
            {app.responsiveWidget && <ResponsiveWidget />}
            {app.responseInterceptors && <ResponseInterceptors />}
            {app.translateYup && ((developmentMode && locale === "fa") || themeDisplay.getLanguageId() === "fa_IR") && (
              <TranslateYup />
            )}
            {developmentMode && <Debug />}
          </PortletMarkups>
        </StoreProvider>
      </MemoryRouter>
    </ErrorBoundary>
  );
}
