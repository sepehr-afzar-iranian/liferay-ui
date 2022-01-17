import React from "react";
import isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import findIndex from "lodash/findIndex";
import { useHistory, matchPath } from "react-router-dom";
import "./styles/Breadcrumb.css";

export default function Breadcrumb({ params, breadcrumb, routes }) {
  const history = useHistory();
  const paths = JSON.parse(JSON.stringify(breadcrumb));
  // Replace Params
  paths.map((item) =>
    isEmpty(params)
      ? item
      : Object.assign(item, {
          title: item.title.replace(
            new RegExp(_map(Object.keys(params), (key) => `:${key}`).join("|"), "gi"),
            (param) => params[param.replace(":", "")]
          ),
          path: item.path
            ? item.path.replace(
                new RegExp(_map(Object.keys(params), (key) => `:${key}`).join("|"), "gi"),
                (param) => params[param.replace(":", "")]
              )
            : undefined,
        })
  );
  // Render
  return (
    <nav className="breadcrumb-container" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {paths.map(({ path, title }, key) => (
          <li
            key={key}
            className={`breadcrumb-item ${!path && "active"}`}
            {...(!path && {
              "aria-current": "page",
            })}
          >
            {!path ? (
              title
            ) : (
              <a
                onClick={() => {
                  history.push(path);
                }}
              >
                {title}
              </a>
            )}
          </li>
        ))}
      </ol>
      {history.location.pathname !== "/" && (
        <button
          className="btn float-right breadcrumb-go-back"
          onClick={() => {
            // history.goBack();
            const currentEntry = findIndex(history.entries, { key: history.location.key });
            for (let i = currentEntry - 1; i >= 0; i--) {
              let match, matchRoute;
              for (let j = 0; j < routes.length; j++) {
                const route = routes[j];
                match = matchPath(history.entries[i].pathname, {
                  path: route.path,
                  exact: route.exact,
                });
                if (match && route.isMain) {
                  matchRoute = route;
                  break;
                }
              }
              if (match && matchRoute) {
                let n = -(currentEntry - i);
                if (match.url === history.location.pathname) n -= 1;
                history.go(n);
                break;
              }
            }
          }}
        >
          بازگشت
        </button>
      )}
    </nav>
  );
}
