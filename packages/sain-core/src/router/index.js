import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import Transition from "./Transition";
import Breadcrumb from "./Breadcrumb";

export default function ({ app, routes }) {
  return routes.map((route, key) => (
    <Route key={key} path={route.path} exact={route.exact}>
      {(props) => {
        let matchRoutes;
        if (props.match)
          matchRoutes = routes.filter(({ path }) => {
            let staticPath = path;
            if (!isEmpty(props.match.params)) {
              let exactRoute;
              if (!isEmpty((exactRoute = routes.filter((er) => er.path === props.match.url))))
                return path === exactRoute[0].path;
              else {
                Object.keys(props.match.params).map(
                  (key) => (staticPath = staticPath.replace(`:${key}`, props.match.params[key]))
                );
                return staticPath === props.match.url;
              }
            } else return path === props.location.pathname && path === props.match.path;
          });
        else matchRoutes = routes.filter(({ path }) => props.location.pathname === path);

        const currentRoute = matchRoutes[matchRoutes.length - 1];
        const isActive = currentRoute && props.match && currentRoute.path === props.match.path;

        if (!isActive) return null;
        else {
          return (
            <Fragment>
              {app.routeBreadcrumb && props.match && currentRoute.breadcrumb && (
                <Breadcrumb params={props.match.params} breadcrumb={currentRoute.breadcrumb} routes={routes} />
              )}
              {app.routeTransition ? (
                <Transition>
                  <currentRoute.component {...props} />
                </Transition>
              ) : (
                <currentRoute.component {...props} />
              )}
            </Fragment>
          );
        }
      }}
    </Route>
  ));
}
