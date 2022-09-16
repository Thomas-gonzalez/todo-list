function mEvent(name) {
    const handlers = []; //array of functions
    return {
        getName: () => name,
        addHandler: (handler) => {
            handlers.push(handler);
        },
        removeHandler: (handler) => {
            for (let i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    handlers.splice(i,1);
                    break;
                }
            }
        },
        fire: (eventArgs) => {
            handlers.forEach(handler => {
                console.log(`firing handler for event ${name}! with arguments ${eventArgs}`);
                handler(eventArgs);
            })
        },
        listHandlers: () => {
            console.log(`handlers for event ${name}:`);
            handlers.forEach(handler => {
                console.log(handler);
            })
        },
    }
}

export default function mEventAggregator() {
    const events = [];

    function getEvent(eventName) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].getName() === eventName) return events[i];
        }
    }

    return {
        publish: (eventName, eventArgs) => {
            console.log(`publishing ${eventName} with args ${eventArgs}`);
            let event = getEvent(eventName);
            if (!event) {
                event = mEvent(eventName);
                events.push(event);
            }

            event.fire(eventArgs);
            event.listHandlers();
        },
        subscribe: (eventName, handler) => {
            console.log(`subscribing to ${eventName} with handler ${handler}`);
            let event = getEvent(eventName);
            if(!event) {
                event = mEvent(eventName);
                events.push(event);
            }

            event.addHandler(handler);
            event.listHandlers();
        },
        logEvents: () => {
            console.log(`logging events`);
            events.forEach((event) => {
                console.log(`event ${event.getName()}`);
                console.log('handlers...');
                event.listHandlers();
            })
        }
    }
}