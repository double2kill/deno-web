import {
  React,
  ReactDOMServer,
  Router,
} from "../dep.ts";

import Index from "./components/Index.tsx";

const bundlePath = "/bundle.js";

const router = new Router();
router
  .get("/", (context: any) => {
    const html =
      `<html><head><script type="module" src="${bundlePath}"></script><style>* { font-family: Helvetica; }</style></head><body><div id="root">${
        (ReactDOMServer as any).renderToString(<Index />)
      }</div></body></html>`;
    context.response.body = html;
  })
  .get(bundlePath, (context: any) => {
    const js =
      `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${Index};\nReactDOM.hydrate(React.createElement(App), document.getElementById("root"));`;
    context.response.body = js;
    context.response.type = "application/javascript";
  });

export { router };
