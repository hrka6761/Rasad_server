import {BASE_USER_ROUTER, HTTPS_PORT} from "./utilities/env.js"
import express from "express"
import {userRouter} from "./routers/user_http_routers.js"
import {errorHandler} from "./middle_wares/error_handling.js"
import {WebSocketServer} from "ws"
import {onReceiveMessage,onCLoseWebsocket} from "./routers/user_signaling_routers.js"


const http = express()
const wss = new WebSocketServer({port: 13676})

http.use(express.json())
http.use(BASE_USER_ROUTER, userRouter)
http.use(errorHandler)

http.listen(HTTPS_PORT, () => {
    console.log('API listening on port ' + HTTPS_PORT)
})

wss.on( "connection", (ws) => {
    ws.on("error", console.error)
    ws.on("message", (data, isBinary) => onReceiveMessage(ws, data, isBinary))
    ws.on("close", (code, reason) => onCLoseWebsocket(ws, code, reason))
})