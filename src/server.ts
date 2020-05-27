import {
  Application,
  Client,
} from "../dep.ts";
import { router } from "./router.tsx";

const app = new Application();

app.use(async (ctx: any, next: any) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} -- ${rt}`);
});

app.use(async (ctx: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
console.log(`Server start success at port ${PORT}`);
await app.listen({ port: PORT });
