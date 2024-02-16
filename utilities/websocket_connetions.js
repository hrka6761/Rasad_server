
class Connections {
    static #connectionsList


    static {
        Connections.#connectionsList = new Map()
    }


    static addConnection(username, ws) {
        Connections.#connectionsList.set(username, ws)
    }

    static getConnection(username) {
        return Connections.#connectionsList.get(username)
    }

    static removeConnectionByUsername(username) {
        Connections.#connectionsList.delete(username);
    }

    static async removeConnectionByWebsocket(ws) {
        let username

        for  (let [key, value] of Connections.#connectionsList.entries()) { 
            if(value === ws){
                username = key
                this.#connectionsList.delete(key)
                break
            }
        }

        return username
    }
}


export default Connections