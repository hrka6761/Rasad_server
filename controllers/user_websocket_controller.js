import {Observers, Observables} from "../utilities/websocket_connections.js"
import authorization from "../middle_wares/user_wss_authorization.js"
import {UserModel} from "../models/user_operations.js"
import {TargetsModel} from "../models/targets_operations.js"
import msgTypes from "../utilities/websocket_message_types.js"


const handlelogInObservable = (ws, msg) => {
    if(msg.data) {
        const authFields = msg.data.split(",")
        const id = authFields[0]
        const token = authFields[1]
        if(authorization(token, id)){
            Observables.addConnection(msg.username, ws)
        }else
            failedAuthorization(ws, 4001, 'توکن نامعتبر !!!')
    } else 
        failedAuthorization(ws, 4000, 'توکن یافت نشد !!!')
}

const handlelogInObserver = (ws, msg) => {
    if(msg.data) {
        const authFields = msg.data.split(".")
        const id = authFields[0]
        const token = authFields[1]
        console.log(id, token);
        if(authorization(token, id)){
            Observers.addConnection(msg.username, ws, msg.targets)
            console.log(msg);
            if(msg.targets) {
                msg.targets.forEach( async target => {
                    const targetConnection = getTargetConnection(target)
                    console.log(targetConnection);
                    if(targetConnection) {
                        const result = await hasTargetPermission(msg.username, target)

                        if(result) {
                            sendDataRequest(targetConnection, msg.username, target)
                            Observables.addConnectionTarget(target, msg.username)
                        } else
                            sendPermissionRequest(targetConnection, msg.username, target)
                    } else {
                        const result = await isTargetValid(target)

                        if(result)
                            sendOfflineTargetMsg(ws, msg.username, target)
                        else
                            sendInvalidTargetMsg(ws, msg.username, target)
                    }
                })
            }
        }else
            failedAuthorization(ws, 4001, 'توکن نامعتبر !!!')
    } else 
        failedAuthorization(ws, 4000, 'توکن یافت نشد !!!')
}

const handleRequestData = (ws, msg) => {
    if(authorizeInObserverList(msg.username)) {
        msg.targets.forEach( async target => {
            const targetConnection = getTargetConnection(target)
            if(targetConnection) {
                const result = await hasTargetPermission(msg.username, target)
    
                if(result) {
                    sendDataRequest(targetConnection, msg.username, target)
                    Observables.addConnectionTarget(target, msg.user)
                } else
                    sendPermissionRequest(targetConnection, msg.username, target)
            } else {
                const result = await isTargetValid(target)

                if(result)
                    sendOfflineTargetMsg(ws, msg.username, target)
                else
                    sendInvalidTargetMsg(ws, msg.username, target)
            }
        })
    } else 
        failedAuthorization(ws, 4002, 'ابتدا وارد شوید.')
}

const handlePermissionResponse = (ws, msg) => {
    if(authorizeInObservableList(msg.username)) {
        msg.targets.forEach( async target => {
            const targetConnection = getTargetConnection(target)
            if(targetConnection) {
                sendPermissionResponse(msg.type, targetConnection, msg.username, target)
                if (msg.type = msgTypes.grant) {
                    sendDataRequest(ws, msg.username, msg.target)
                    Observables.addConnectionTarget(msg.username, target)
                }
            } else {
                const result = await isTargetValid(target)

                if(result)
                    sendOfflineTargetMsg(ws, msg.username, target)
                else
                    sendInvalidTargetMsg(ws, msg.username, target)
            }
        })
    } else 
        failedAuthorization(ws, 4002, 'ابتدا وارد شوید.')
}

const handleDataRequest = (ws, msg) => {
    if(authorizeInObservableList(msg.username)) {
        msg.targets.forEach( async target => {
            const targetConnection = getTargetConnection(target)
            if(targetConnection) {
                sendData(targetConnection, msg.username, msg.target)
            } else {
                const result = await isTargetValid(target)

                if(result)
                    sendLogOutObserverMsg(ws, msg.username, msg.target)
                else
                    sendInvalidTargetMsg(ws, msg.username, target)
            }
        })
    } else 
        failedAuthorization(ws, 4002, 'ابتدا وارد شوید.')
}

const handleLogoutObservable = async (ws, code, reason) => {
    const result = await Observables.removeConnectionByWebsocket(ws)
    console.log(`${result.username}  disconnected and its connection removed from the connections list. CODE: ${code}, REASON: ${reason}`);
    if(result.connection.targets){ 
        result.connection.targets.forEach((target) => {
            const targetConnection = getTargetConnection(target)
            if(targetConnection) {
                sendLogOutObservableMsg(targetConnection, result.username, ta)
            }
        }) 
    }     
}



function getTargetConnection(target) {
    console.log("getTargetConnection");
    return Observables.getConnection(target)
}

async function hasTargetPermission(username, target) {
    console.log("hasTargetPermission");
    const result = await TargetsModel.fetchTarget(username, target)
    if(result)
        return true
    else 
        return false
}

async function isTargetValid(target) {
    console.log("isTargetValid");
    const result = await UserModel.fetchUserByUsername(target)
        if(result)
            return true
        else
            return false
}

function sendDataRequest(targetConnection, username, target) {
    console.log("sendDataRequest");
    targetConnection.send(
        JSON.stringify({
            type: msgTypes.requestData,
            username: username,
            targets: [target],
            data: null
        })
    )
}

function sendPermissionRequest(targetConnection, username, target) {
    console.log("sendPermissionRequest");
    targetConnection.send(
        JSON.stringify({
            type: msgTypes.requestPermission,
            username: username,
            targets: [target],
            data: null
        })
    )
}

function sendOfflineTargetMsg(userConnection, username, target) {
    console.log("sendOfflineTargetMsg");
    userConnection.send(
        JSON.stringify({
            type: msgTypes.failed,
            username: username,
            targets: [target],
            data: "Target is offline."
        })
    )
}

function sendLogOutObserverMsg(userConnection, username, target) {
    console.log("sendOfflineTargetMsg");
    userConnection.send(
        JSON.stringify({
            type: msgTypes.logOutObserver,
            username: username,
            targets: [target],
            data: "Target was logo out."
        })
    )
}

function sendLogOutObservableMsg(userConnection, username, target) {
    console.log("sendOfflineTargetMsg");
    userConnection.send(
        JSON.stringify({
            type: msgTypes.logOutObserver,
            username: username,
            targets: [target],
            data: "Target was logo out."
        })
    )
}

function sendInvalidTargetMsg(userConnection, username, target) {
    console.log("sendInvalidTargetMsg");
    userConnection.send(
        JSON.stringify({
            type: msgTypes.failed,
            username: username,
            targets: [target],
            data: "Target is not valid."
        })
    )
}

function sendPermissionResponse(response, userConnection, username, target) {
    console.log("sendPermissionResponse");
    userConnection.send(
        JSON.stringify({
            type: response,
            username: username,
            targets: [target],
            data: null
        })
    )
}

function sendData(targetConnection, username, target) {
    console.log("sendData");
    userConnection.send(
        JSON.stringify({
            type: msgTypes.data,
            username: username,
            targets: [target],
            data: null
        })
    )
}

function authorizeInObserverList(username) {
    if(Observers.getConnection(username))
        return true
    else
        return false
}

function authorizeInObservableList(username) {
    if(Observers.getConnection(username))
        return true
    else
        return false
}

function failedAuthorization(ws, code, reason) {
    const msg = {code,reason}
    ws.send(JSON.stringify(msg))
    ws.terminate()
}


export {
    handlelogInObservable,
    handlelogInObserver,
    handleRequestData,
    handlePermissionResponse,
    handleDataRequest,
    handleLogoutObservable
}