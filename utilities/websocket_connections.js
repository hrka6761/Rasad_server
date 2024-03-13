class Observers {
    static #observersList


    static {
        Observers.#observersList = new Map()
    }


    static addMember(username, ws) {
        Observers.#observersList.set(username, {connection: ws, targets: []})
    }

    static addConnectionTarget(username, target) {
        const targetArray = this.getMember(username).targets
        if(targetArray){
            targetArray.push(target)
            this.getMember(username).targets = targetArray
        } else
            this.getMember(username).targets = [target]
    }

    static removeTarget(username, target) {
        const targetArray = this.getMember(username).targets
        if(targetArray){
            const newTargets = targetArray.filter(item => item !== target)
            this.getMember(username).targets = newTargets
        }
    }

    static getMember(username) {
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


    static addMember(username, connection) {
        Observables.#observablesList.set(username, {connection: connection, targets: []})
    }

    static addConnectionTarget(username, target) {
        const targetArray = this.getMember(username).targets
        if(targetArray){
            targetArray.push(target)
            this.getMember(username).targets = targetArray
        } else
            this.getMember(username).targets = [target]
    }

    static removeConnectionTarget(username, target) {
        const targetArray = this.getMember(username)
        if (targetArray) {
            if(targetArray.targets){
                const newTargets = targetArray.filter(item => item !== target)
                this.getMember(username).targets = newTargets
            }
        }
    }

    static getMember(username) {
        return Observables.#observablesList.get(username)
    }

    static removeMemberByUsername(username) {
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