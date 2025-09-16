
function eventEmitter() {
    let subscribe = new Map();
    return {
        on(eventName, callback) {
            if (!subscribe.has(eventName)) {
                subscribe.set(eventName, []);
            }
            subscribe.get(eventName).push(callback);
        },
        off (eventName, callback) {
            if (subscribe.has(eventName)) {
                subscribe.delete(eventName);
            }
        },
        emit(eventName, payload) {
            for(let [name, arr] of subscribe.entries()) {
                     if (name === eventName) {
                        arr.forEach(callback => {
                            callback(payload);
                        });
                     }
            }
        }
    }
}


function useEvent(eventName, callback) {
    useEffect(() => {
        eventEmitter.on(eventName, callback);

        return () => {
            eventEmitter.off(eventName)
        }
    });
}

function Exponent() {
    const handleChange = (payload) => {

    }
     useEvent('render', handleChange)
}

function EmitComponent() {
    eventEmitter.emit('render', {1: 1});
}