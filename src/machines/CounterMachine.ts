import { assign, createMachine } from 'xstate';

type CounterMachineEvents = {
    type: "User pressed increase button"
} | {
    type: "User pressed descrease button"
}

type CounterMachineContext = {
    counter: number
}

export const createCounterMachine = () => {
    console.log("createCounterMachine")
    return createMachine({
        id: 'counter',
        tsTypes: {} as import("./CounterMachine.typegen").Typegen0,
        schema: {
            events: {} as CounterMachineEvents,
            context: {} as CounterMachineContext
        },
        context: {
            counter: 42
        },
        initial: 'Idle',
        states: {
            Idle: {
                on: {
                    "User pressed descrease button": {
                        actions: 'Assign decreased counter to context'
                    },
                    "User pressed increase button": {
                        actions: "Assign increased counter to context"
                    }
                }
            },
        }
    }, {
        actions: {
            "Assign decreased counter to context": assign({
                counter: (context) => context.counter - 1
            }),

            "Assign increased counter to context": assign({
                counter: (context) => context.counter + 1
            }),
        }
    })
};
