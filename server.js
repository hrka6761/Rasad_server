import {BASE_USER_ROUTER, HTTPS_PORT} from "./utilities/env.js"
import express from 'express'
import {userRouter} from "./routers/user_routers.js"


const api = express()

api.use(express.json())
api.use(BASE_USER_ROUTER, userRouter)

api.listen(HTTPS_PORT, () => {
    console.log('API listening on port ' + HTTPS_PORT)
})