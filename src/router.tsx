import {
  React,
  ReactDOMServer,
  Router,
  Client,
} from "../dep.ts";

import Index from "./components/Index.tsx";
import { dbConfig } from "./config.ts";
const client = await new Client().connect(dbConfig);

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
    const js = `import React from "https://dev.jspm.io/react@16.13.1";
       import ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";
       import axios from "https://dev.jspm.io/axios";
       const App = ${Index};
       ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));`;
    context.response.body = js;
    context.response.type = "application/javascript";
  })
  .post("/mysql", async (context: any) => {
    const { value } = await context.request.body({
      contentTypes: {
        text: ["application/javascript"],
      },
    });
    const data = await client.query(value.query);

    context.response.body = data;
  });

export { router };
