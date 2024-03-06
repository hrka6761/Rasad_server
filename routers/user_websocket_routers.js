import msgTypes from "../utilities/websocket_message_types.js"
import {
handlelogInObservable,
handlelogInObserver,
handleRequestData,
handlePermissionResponse,
handleDataRequest,
handleLogoutObservable,
handleLogoutObserver,
handleDisconnect
} from "../controllers/user_websocket_controller.js"
import { Observables } from "../utilities/websocket_connections.js"


function onMessageWebsocket(ws, data, isBinary) {
    

    try {
        const msg = JSON.parse(convertDataToString(data))
        switch(msg.type) {
            case msgTypes.logInObservable:
                handlelogInObservable(ws, msg)
                break
            case msgTypes.logOutObservable:
                handleLogoutObservable(ws, msg)
                break
            case msgTypes.logInObserver:
                handlelogInObserver(ws, msg)
                break
            case msgTypes.logOutObserver:
                handleLogoutObserver(ws, msg)
                break
            case msgTypes.requestData:
                handleRequestData(ws, msg)
                break
            case msgTypes.grant:
                handlePermissionResponse(ws, msg)
                break
            case msgTypes.denay:
                handlePermissionResponse(ws, msg)
                break
            case msgTypes.data:
                handleDataRequest(ws, msg)
                break
        }

    } catch(error) {
        console.log(error);
    }
}

function onCloseWebsocket(ws, code, data) {
    const reason = convertDataToString(data)
    handleDisconnect(ws, code, reason)
}


function convertDataToString(data){
    const msg = Buffer.from(data)
    return new TextDecoder('utf-8').decode(msg);
}

export { 
    onMessageWebsocket,
    onCloseWebsocket
}
