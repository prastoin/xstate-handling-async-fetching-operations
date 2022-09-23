import { createLoadUserInformationMachine, type LoadUserInformationDoneInvokeEvent } from "./LoadUserInformationMachine";
import type { UserCart, UserInformation } from "@/type";
import { assign, createMachine, type DoneInvokeEvent } from "xstate";
import { createLoadUserCartMachine, type LoadUserCartMachineContext, type LoadUserCartMachineDoneInvokeEvent } from "./LoadUserCartMachine";
import { forwardTo, send, sendTo } from "xstate/lib/actions";

type LoadUserDataMainMachineEvents = {
    type: "User pressed load user data button";
} | {
    type: "User pressed reset machine button";
} | {
    type: "User pressed global operations retry";
};

type LoadUserDataMainMachineContext = {
    userInformation?: UserInformation;
    userCart?: UserCart;
};

export const createLoadUserDataMainMachine = () => {
    return createMachine(
        {
            id: "loadUserInformationMachine",
            tsTypes: {} as import("./LoadUserDataMainMachine.typegen").Typegen0,
            schema: {
                events: {} as LoadUserDataMainMachineEvents,
                context: {} as LoadUserDataMainMachineContext,
            },
            context: {
                userInformation: undefined,
                userCart: undefined,
            },
            initial: "Idle",
            states: {
                Idle: {
                    on: {
                        "User pressed load user data button": {
                            target: "Load user data",
                        },
                    },
                },

                "Load user data": {
                    tags: "Currently loading",
                    type: "parallel",
                    onDone: {
                        target: "Loaded user data"
                    },

                    on: {
                        "User pressed global operations retry": {
                            actions: [
                                "Send retry to loadUserCartMachine",
                                "Send retry to loadUserInformationMachine"
                            ]
                        }
                    },

                    states: {
                        "Loading user cart": {
                            initial: "Invoke loadUserCartMachine",
                            states: {
                                "Invoke loadUserCartMachine": {
                                    invoke: {
                                        id: "LoadUserCartMachine",
                                        src: (_context, _event) => {
                                            return createLoadUserCartMachine();
                                        },
                                        onDone: {
                                            target: "loadUserCartMachine reached final state",
                                            actions: "assign retrieved user cart to context"
                                        },
                                    }
                                },
                                "loadUserCartMachine reached final state": {
                                    type: "final"
                                }
                            },
                        },

                        "Load user information": {
                            initial: "Invoke loardUserInformationMachine",
                            states: {
                                "Invoke loardUserInformationMachine": {
                                    invoke: {
                                        id: "loardUserInformationMachine",
                                        src: (_context, _event) => {
                                            return createLoadUserInformationMachine();
                                        },
                                        onDone: {
                                            target: "loardUserInformationMachine reached final state",
                                            actions: "assign retrieved user information to context"
                                        },
                                    }
                                },
                                "loardUserInformationMachine reached final state": {
                                    type: "final"
                                }
                            },
                        }
                    },


                },

                "Loaded user data": {
                    on: {
                        "User pressed reset machine button": {
                            target: "#loadUserInformationMachine.Idle",
                            actions: "Reset machine context"
                        }
                    }
                }
            },
        },
        {
            actions: {
                "Send retry to loadUserCartMachine": send({ type: "Retry loading user cart" }, { to: "loadUserCartMachine" }),
                "Send retry to loadUserInformationMachine": send({ type: "Retry loading user information" }, { to: "loadUserCartMachine" }),

                "assign retrieved user cart to context": assign({
                    userCart: (_context, e) => {
                        const event = e as LoadUserCartMachineDoneInvokeEvent
                        return event.data.userCart
                    }
                }),
                "assign retrieved user information to context": assign({
                    userInformation: (_context, e) => {
                        const event = e as LoadUserInformationDoneInvokeEvent
                        return event.data.userInformation
                    }
                }),
                "Reset machine context": assign({
                    userCart: (_context, _event) => undefined,
                    userInformation: (_context, _event) => undefined
                })
            },
        }
    );
};
