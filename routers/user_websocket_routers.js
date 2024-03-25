import { msgTypes } from "../utilities/websocket_message_types.js";
import {
  handlelogInObservable,
  handlelogInObserver,
  handleRequest,
  handlePermissionResponse,
  handleData,
  handleLogoutObservable,
  handleLogoutObserver,
  handleDisconnect,
} from "../controllers/user_websocket_controller.js";

export function onMessageWebsocket(ws, data, isBinary) {
  try {
    const msg = JSON.parse(convertDataToString(data));
    switch (msg.type) {
      case msgTypes.logInObservable:
        handlelogInObservable(ws, msg);
        break;
      case msgTypes.logOutObservable:
        handleLogoutObservable(ws, msg);
        break;
      case msgTypes.logInObserver:
        handlelogInObserver(ws, msg);
        break;
      case msgTypes.logOutObserver:
        handleLogoutObserver(ws, msg);
        break;
      case msgTypes.requestData:
        handleRequest(ws, msg);
        break;
      case msgTypes.grant:
        handlePermissionResponse(ws, msg);
        break;
      case msgTypes.deny:
        handlePermissionResponse(ws, msg);
        break;
      case msgTypes.data:
        handleData(ws, msg);
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

export function onCloseWebsocket(ws, code, data) {
  const reason = convertDataToString(data);
  handleDisconnect(ws, code, reason);
}

function convertDataToString(data) {
  const msg = Buffer.from(data);
  const text = new TextDecoder("utf-8").decode(msg);
  return text;
}
