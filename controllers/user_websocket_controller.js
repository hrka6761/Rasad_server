import { Observers, Observables } from "../utilities/websocket_connections.js";
import { authorization } from "../middle_wares/user_wss_authorization.js";
import { UserModel } from "../models/user_operations.js";
import { TargetsModel } from "../models/targets_operations.js";
import { msgTypes } from "../utilities/websocket_message_types.js";

export const handlelogInObservable = (ws, msg) => {
  if (msg.data) {
    const authFields = msg.data.split(",");
    const id = authFields[0];
    const token = authFields[1];
    if (authorization(token, id)) {
      Observables.addMember(msg.username, ws);
      ws.send(
        JSON.stringify({
          type: msgTypes.confirmation,
          username: msg.username,
          targets: msg.targets,
          data: msgTypes.logInObservable,
        })
      );
    } else failedAuthorization(ws, 4001, "توکن نامعتبر !!!");
  } else failedAuthorization(ws, 4000, "توکن یافت نشد !!!");
};

export const handlelogInObserver = (ws, msg) => {
  if (msg.data) {
    const authFields = msg.data.split(",");
    const id = authFields[0];
    const token = authFields[1];
    if (authorization(token, id)) {
      Observers.addMember(msg.username, ws);
      ws.send(
        JSON.stringify({
          type: msgTypes.confirmation,
          username: msg.username,
          targets: msg.targets,
          data: msgTypes.logInObserver,
        })
      );
    } else failedAuthorization(ws, 4001, "توکن نامعتبر !!!");
  } else failedAuthorization(ws, 4000, "توکن یافت نشد !!!");
};

export const handleRequest = (ws, msg) => {
  if (authorizeInObserverList(msg.username)) {
    msg.targets.forEach(async (target) => {
      const targetConnection = Observables.getMember(target);
      if (targetConnection) {
        const result = await hasTargetPermission(msg.username, target);
        const connection = targetConnection.connection;

        if (result) sendDataRequest(connection, target, msg.username, msg.data);
        else sendPermissionRequest(connection, msg.username, target, msg.data);

        ws.send(
          JSON.stringify({
            type: msgTypes.confirmation,
            username: msg.username,
            targets: msg.targets,
            data: msgTypes.requestData,
          })
        );
      } else {
        const result = await isTargetValid(target);

        if (result) sendOfflineTargetMsg(ws, msg.username, target);
        else sendInvalidTargetMsg(ws, msg.username, target);
      }
    });
  } else failedAuthorization(ws, 4002, "ابتدا وارد شوید.");
};

export const handlePermissionResponse = (ws, msg) => {
  if (authorizeInObservableList(msg.username)) {
    msg.targets.forEach(async (target) => {
      const targetMember = Observers.getMember(target);
      if (targetMember) {
        sendPermissionResponse(
          msg.type,
          targetMember.connection,
          msg.username,
          target
        );
        if (msg.type === msgTypes.grant) {
          TargetsModel.insertTarget(target, msg.username);
          sendDataRequest(ws, msg.username, target, msg.data);
        }
      } else {
        const result = await isTargetValid(target);
        if (result) sendOfflineTargetMsg(ws, msg.username, target);
        else sendInvalidTargetMsg(ws, msg.username, target);
      }
    });
    ws.send(
      JSON.stringify({
        type: msgTypes.confirmation,
        username: msg.username,
        targets: msg.targets,
        data: msg.type,
      })
    );
  } else failedAuthorization(ws, 4002, "ابتدا وارد شوید.");
};

export const handleData = (ws, msg) => {
  if (authorizeInObservableList(msg.username)) {
    msg.targets.forEach(async (target) => {
      const targetMember = Observers.getMember(target);
      if (targetMember) {
        if (targetMember.connection) {
          sendData(targetMember.connection, msg.username, target, msg.data);
          ws.send(
            JSON.stringify({
              type: msgTypes.confirmation,
              username: msg.username,
              targets: msg.targets,
              data: msgTypes.data,
            })
          );
        } else {
          const result = await isTargetValid(target);
          if (result) sendLogOutObserverMsg(ws, msg.username, msg.target);
          else sendInvalidTargetMsg(ws, msg.username, target);
        }
      }
    });
  } else failedAuthorization(ws, 4002, "ابتدا وارد شوید.");
};

export const handleLogoutObservable = (ws, msg) => {
  if (authorizeInObservableList(msg.username)) {
    Observables.removeMemberByUsername(msg.username);
    if (msg.targets) {
      msg.targets.forEach((target) => {
        const observerMember = Observers.getMember(target);
        if (observerMember) {
          Observers.removeTarget(target, msg.username);
          if (observerMember.connection) {
            observerMember.connection.send(
              JSON.stringify({
                type: msgTypes.logOutObservable,
                username: msg.username,
                targets: [target],
                data: null,
              })
            );
          }
        }
      });
    }
    ws.send(
      JSON.stringify({
        type: msgTypes.confirmation,
        username: msg.username,
        targets: msg.targets,
        data: msgTypes.logOutObservable,
      })
    );
    console.log(
      `${msg.username} logout and removed from the connections list.`
    );
  } else failedAuthorization(ws, 4002, "ابتدا وارد شوید.");
};

export const handleLogoutObserver = (ws, msg) => {
  console.log(
    `${msg.username} disconnected and removed from the connections list.`
  );
  const targets = Observers.getMember(msg.username).targets;
  if (targets) {
    targets.forEach((target) => {
      const targetConnection = Observables.getMember(target).connection;
      Observables.removeConnectionTarget(target, msg.username);
      if (targetConnection) {
        targetConnection.send(
          JSON.stringify({
            type: msgTypes.logOutObserver,
            username: target,
            targets: [msg.username],
            data: null,
          })
        );
      }
    });
  }
  ws.send(
    JSON.stringify({
      type: msgTypes.confirmation,
      username: msg.username,
      targets: msg.targets,
      data: msgTypes.logOutObserver,
    })
  );
};

export const handleDisconnect = async (ws, code, reason) => {
  const observableResult = await Observables.removeConnectionByWebsocket(ws);
  if (observableResult.username) {
    console.log(
      `${observableResult.username}  disconnected and its connection removed from the connections list. CODE: ${code}, REASON: ${reason}`
    );
    const targets = observableResult.connection.targets;
    if (targets) {
      observableResult.connection.targets.forEach((target) => {
        Observers.removeTarget(target, observableResult.username);
        const targetConnection = Observers.getMember(target);
        if (targetConnection) {
          if (targetConnection.connection) {
            sendLogOutObservableMsg(
              targetConnection.connection,
              observableResult.username,
              target
            );
          }
        }
      });
    }
  } else {
    const observerResult = await Observers.removeConnectionByWebsocket(ws);
    if (observerResult.username) {
      console.log(
        `${observerResult.username}  disconnected and its connection removed from the connections list. CODE: ${code}, REASON: ${reason}`
      );
      const targets = observerResult.connection.targets;
      if (targets) {
        observerResult.connection.targets.forEach((target) => {
          Observables.removeConnectionTarget(target, observerResult.username);
          const targetConnection = Observables.getMember(target);
          if (targetConnection) {
            if (targetConnection.connection) {
              sendLogOutObserverMsg(
                targetConnection.connection,
                observerResult.username,
                target
              );
            }
          }
        });
      }
    }
  }
};

async function hasTargetPermission(username, target) {
  const result = await TargetsModel.fetchTarget(username, target);
  if (result) return true;
  else return false;
}

async function isTargetValid(target) {
  const result = await UserModel.fetchUserByUsername(target);
  if (result) return true;
  else return false;
}

function sendDataRequest(targetConnection, username, target, data) {
  Observables.addTarget(username, target);
  Observers.addTarget(target, username);
  targetConnection.send(
    JSON.stringify({
      type: msgTypes.requestData,
      username: target,
      targets: [username],
      data: data,
    })
  );
}

function sendPermissionRequest(targetConnection, username, target, data) {
  targetConnection.send(
    JSON.stringify({
      type: msgTypes.requestPermission,
      username: username,
      targets: [target],
      data: data,
    })
  );
}

function sendOfflineTargetMsg(userConnection, username, target) {
  const data = JSON.stringify({
    code: 4003,
    reason: `${target} is offline.`,
  });
  userConnection.send(
    JSON.stringify({
      type: msgTypes.failed,
      username: username,
      targets: [target],
      data: data,
    })
  );
}

function sendLogOutObserverMsg(userConnection, username, target) {
  userConnection.send(
    JSON.stringify({
      type: msgTypes.logOutObserver,
      username: username,
      targets: [target],
      data: "Target was logo out.",
    })
  );
}

function sendLogOutObservableMsg(userConnection, username, target) {
  userConnection.send(
    JSON.stringify({
      type: msgTypes.logOutObservable,
      username: username,
      targets: [target],
      data: "Target was logo out.",
    })
  );
}

function sendInvalidTargetMsg(userConnection, username, target) {
  const data = JSON.stringify({
    code: 4004,
    reason: `${target} is not a valid username.`,
  });
  userConnection.send(
    JSON.stringify({
      type: msgTypes.failed,
      username: username,
      targets: [target],
      data: data,
    })
  );
}

function sendPermissionResponse(response, userConnection, username, target) {
  userConnection.send(
    JSON.stringify({
      type: response,
      username: username,
      targets: [target],
      data: null,
    })
  );
}

function sendData(targetConnection, username, target, data) {
  targetConnection.send(
    JSON.stringify({
      type: msgTypes.data,
      username: username,
      targets: [target],
      data: data,
    })
  );
}

function authorizeInObserverList(username) {
  if (Observers.getMember(username)) return true;
  else return false;
}

function authorizeInObservableList(username) {
  if (Observables.getMember(username)) return true;
  else return false;
}

function failedAuthorization(connection, code, reason) {
  const data = JSON.stringify({ code: code, reason: reason });
  const msg = {
    type: msgTypes.failed,
    username: "",
    targets: "",
    data: data,
  };
  connection.send(JSON.stringify(msg));
  connection.terminate();
}
