import {
  BASE_USER_ROUTER,
  HTTPS_PORT,
  SIGNALING_PORT,
  WEB_SOCKET_PORT,
} from "./utilities/env.js";
import express from "express";
import { userRouter } from "./routers/user_http_routers.js";
import { errorHandler } from "./middle_wares/error_handling.js";
import { WebSocketServer } from "ws";
import {
  onMessageWebsocket,
  onCloseWebsocket,
} from "./routers/user_websocket_routers.js";
// import {
//   onMessageSignaling,
//   onCloseSignaling,
// } from "./routers/user_signaling_routers.js";

const http = express();
const webSocket = new WebSocketServer({ port: WEB_SOCKET_PORT });
// const signaling = new WebSocketServer({ port: SIGNALING_PORT });

http.use(express.json());
http.use(BASE_USER_ROUTER, userRouter);
http.use(errorHandler);

http.listen(HTTPS_PORT, () => {
  console.log("API listening on port " + HTTPS_PORT);
});

webSocket.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (data, isBinary) => onMessageWebsocket(ws, data, isBinary));
  ws.on("close", (code, reason) => onCloseWebsocket(ws, code, reason));
});

// signaling.on("connection", (ws) => {
//   ws.on("error", console.error);
//   ws.on("message", (data, isBinary) => onMessageSignaling(ws, data, isBinary));
//   ws.on("close", (code, reason) => onCloseSignaling(ws, code, reason));
// });
