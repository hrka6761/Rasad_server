class Connections {
    static #connectionsList


    static {
        Connections.#connectionsList = new Map()
    }


    static addConnection(username, ws, targets) {
        Connections.#connectionsList.set(username, {websocket: ws, targets: targets})
    }

    static getConnection(username) {
        return Connections.#connectionsList.get(username)
    }

    static removeConnectionByUsername(username) {
        Connections.#connectionsList.delete(username);
    }

    static async removeConnectionByWebsocket(ws) {
        let username
        let targets

        for  (let [key, value] of Connections.#connectionsList.entries()) { 
            if(value === ws){
                username = key
                targets  = value.targets
                this.#connectionsList.delete(key)
                break
            }
        }

        return {username, targets}
    }
}


export default Connections