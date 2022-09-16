import { fetchUserInformation } from '@/services/UserService';
import type { UserInformation } from '@/type';
import { assign, createMachine, type DoneInvokeEvent } from 'xstate';

type LoadUserInformationMachineEvents = {
    type: "User pressed load user information button"
}

type LoadUserInformationMachineContext = {
    userInformation?: UserInformation
}

export const createLoadUserInformationMachine = () => {
    return createMachine({
        id: 'loadUserInformationMachine',
        tsTypes: {} as import("./LoadUserInformationMachine.typegen").Typegen0,
        schema: {
            services: {} as {
                "Loading user information from server": {
                    // The data that gets returned from the service
                    data: UserInformation;
                };
            },
            events: {} as LoadUserInformationMachineEvents,
            context: {} as LoadUserInformationMachineContext
        },
        context: {
            userInformation: undefined
        },
        initial: 'Idle',
        states: {
            Idle: {
                on: {
                    "User pressed load user information button": {
                        target: "Loading user information from server"
                    }
                }
            },

            "Loading user information from server": {
                invoke: {
                    src: "Loading user information from server",

                    onDone: {
                        target: 'Loaded user information',
                        actions: "Assign loaded user information to context"
                    },

                    onError: {
                        target: 'Loading user information failed',
                    }
                }
            },

            "Loading user information failed": {
                on: {
                    "User pressed load user information button": {
                        target: "Loading user information from server"
                    }
                }
            },

            "Loaded user information": {
                type: "final"
            }
        }
    }, {
        actions: {
            "Assign loaded user information to context": assign({
                userInformation: (_context, event) => {
                    return event.data
                }
            })
        },
        services: {
            "Loading user information from server": async (context, event) => await fetchUserInformation()
        }
    })
};
