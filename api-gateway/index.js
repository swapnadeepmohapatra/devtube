import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { decode } from "./utils/decode.js";
import { PORT, routes } from "./utils/config.js";

dotenv.config();

const app = express();

app.use(cookieParser());

for (const route in routes) {
  const target = routes[route];
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq, req, res) => {
          try {
            const decoded = decode(req.headers.cookie);
            proxyReq.setHeader("user", JSON.stringify(decoded));
            proxyReq.removeHeader("cookie");
          } catch (err) {
            console.log(err);
            res.status(401).json({
              status: "error",
              message: "Unauthorized",
              data: {},
            });
          }
        },
      },
    })
  );
}

app.listen(PORT, () => {
  console.log(`api gateway started listening on port : ${PORT}`);
});
