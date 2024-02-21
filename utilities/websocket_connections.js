class Observers {
    static #observersList


    static {
        Observers.#observersList = new Map()
    }


    static addConnection(username, ws, targets) {
        Observers.#observersList.set(username, {websocket: ws, targets: targets})
    }

    static getConnection(username) {
        return Observers.#observersList.get(username)
    }

    static removeConnectionByUsername(username) {
        Observers.#observersList.delete(username);
    }

    static async removeConnectionByWebsocket(ws) {
        let username
        let targets

        for  (let [key, value] of Observers.#observersList.entries()) { 
            if(value === ws){
                username = key
                targets  = value.targets
                Observers.#observersList.delete(key)
                break
            }
        }

        return {username, targets}
    }
}

class Observables {
    static #observablesList


    static {
        Observables.#observablesList = new Map()
    }


    static addConnection(username, ws) {
        Observables.#observablesList.set(username, {websocket: ws, targets: null})
    }

    static addConnectionTarget(username, target) {
        const targetArray = this.getConnection(username).targets
        if(targetArray){
            targetArray.push(target)
            this.getConnection(username).targets = targetList
        } else
            this.getConnection(username).targets = [target]
    }

    static getConnection(username) {
        return Observables.#observablesList.get(username)
    }

    static removeConnectionByUsername(username) {
        Observables.#observablesList.delete(username);
    }

    static async removeConnectionByWebsocket(ws) {
        let username
        let connection

        for  (let [key, value] of Observables.#observablesList.entries()) { 
            if(value.websocket === ws){
                username = key
                connection  = value
                Observables.#observablesList.delete(key)
                break
            }
        }

        return {username, connection}
    }
}


export {Observers, Observables}