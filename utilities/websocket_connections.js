class Observers {
    static #observersList


    static {
        Observers.#observersList = new Map()
    }


    static addConnection(username, ws, targets) {
        Observers.#observersList.set(username, {websocket: ws, targets: targets})
    }

    static addConnectionTarget(username, target) {
        const targetArray = this.getConnection(username).targets
        if(targetArray){
            targetArray.push(target)
            this.getConnection(username).targets = targetArray
        } else
            this.getConnection(username).targets = [target]
    }

    static removeConnectionTarget(username, target) {
        const targetArray = this.getConnection(username).targets
        if(targetArray){
            const newTargets = targetArray.filter(item => item !== target)
            this.getConnection(username).targets = newTargets
        }
    }

    static getConnection(username) {
        return Observers.#observersList.get(username)
    }

    static removeConnectionByUsername(username) {
        Observers.#observersList.delete(username);
    }

    static async removeConnectionByWebsocket(ws) {
        let username
        let connection

        for  (let [key, value] of Observers.#observersList.entries()) { 
            if(value.websocket === ws){
                username = key
                connection  = value
                Observers.#observersList.delete(key)
                break
            }
        }
        
        return {username, connection}
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
            this.getConnection(username).targets = targetArray
        } else
            this.getConnection(username).targets = [target]
    }

    static removeConnectionTarget(username, target) {
        const targetArray = this.getConnection(username)
        if (targetArray) {
            if(targetArray.targets){
                const newTargets = targetArray.filter(item => item !== target)
                this.getConnection(username).targets = newTargets
            }
        }
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