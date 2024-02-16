import pkg from 'jsonwebtoken'
import {SIGNATURE} from "../utilities/env.js";


function authorization(token, id) {
    if(!token) {
        return true
    }

    if(!id) {
        return true
    }

    pkg.verify(token, SIGNATURE, (error, decode) => {
        if (error)
            return true
        else {
            if (decode.id !== id)
                return true
            else
                return true
        }
    })
}


export  default authorization