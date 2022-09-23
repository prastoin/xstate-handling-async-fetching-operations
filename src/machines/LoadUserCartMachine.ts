import type { UserCart } from "@/type";
import { createMachine, type ActorRef, type DoneInvokeEvent } from "xstate";

export interface LoadUserCartMachineEvents {
  type: "Retry loading user cart"
}

export interface LoadUserCartMachineContext {
  userCart?: UserCart
}

export type LoadUserCartActorRef = ActorRef<
  LoadUserCartMachineEvents,
  LoadUserCartMachineContext
>;

export type LoadUserCartMachineDoneInvokeEvent =
  DoneInvokeEvent<Required<LoadUserCartMachineContext>>;

export const createLoadUserCartMachine = () => {
  return createMachine({
    id: "loadUserCartMachine",
    tsTypes: {} as import("./LoadUserCartMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        "Fetch user cart": {
          data: UserCart
        }
      },
      context: {} as LoadUserCartMachineContext,
      events: {} as LoadUserCartMachineEvents
    },
    context: {
      userCart: undefined,
    },
    initial: "Fetching user cart",
    states: {
      "Fetching user cart": {
        invoke: {
          src: "Fetch user cart",

          onDone: {
            target: "Loaded user cart",
            actions: "Assign loaded user cart to context",
          },

          onError: {
            target: "Loading user cart failed",
          },
        },
      },

      "Loading user cart failed": {
        on: {
          "Retry loading user cart": {
            target: "Fetching user cart",
          },
        },
      },

      "Loaded user cart": {
        type: "final",

        data: (context) => context.userCart,
      },
    }
  })
}