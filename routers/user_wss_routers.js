import msgTypes from "../utilities/websocket_msg_types.js"
import Connections from "../utilities/websocket_connetions.js"


function onReceiveMessage(ws, data, isBinary) {

    const msg = convertDataToString(data)

    switch(msg) {
        case msgTypes.signIn:
            break
        case msgTypes.handshake:
            break
        case msgTypes.call:
            break
        case msgTypes.answer:
            break    
        case msgTypes.iceCandidate:
            break
        case msgTypes.signOut:
            break                                                
    }
}

function onCLoseWebsocket(ws, code, data) {
    const reason = convertDataToString(data)
    Connections.removeConnectionByWebsocket(ws).then((username) => {
        console.log(`${username}  disconnected and its connection removed from the connections list. CODE: ${code}, REASON: ${reason}`);        
    })
}


function convertDataToString(data){
    const msg = Buffer.from(data)
    return new TextDecoder('utf-8').decode(msg);
}


export { 
    onReceiveMessage ,
    onCLoseWebsocket
}