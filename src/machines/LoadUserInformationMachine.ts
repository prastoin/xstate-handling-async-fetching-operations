import { fetchUserInformation } from "@/services/UserService";
import type { UserInformation } from "@/type";
import { assign } from "cypress/types/lodash";
import { createMachine, type ActorRef, type DoneInvokeEvent } from "xstate";
import { sendParent } from "xstate/lib/actions";

export interface LoadUserInformationMachineEvents {
  type: "Retry loading user information"
}

export interface LoadUserInformationMachineContext {
  userInformation?: UserInformation
}

export type LoadUserInformationDoneInvokeEvent = DoneInvokeEvent<Required<LoadUserInformationMachineContext>>
export type LoadUserInformationActorRef = ActorRef<
  LoadUserInformationMachineEvents,
  LoadUserInformationMachineContext
>

export const createLoadUserInformationMachine = () => {

  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCBVWYBOAwungC4Cy6AxgBYCWAdmAHQBiYJNDUABAK655uDAGao8AW3QlaqegGIIs5gwBuqANbM0mHPiKkKnRq3ZGe-fEPqiJUmfQSrUlO7IDaABgC6iUAAdUWFppWV8QAA9EAGYAFgBWJgAmAE4YqI8AdgA2ZMSsrIAOGJiAGhAAT0QC5KZkwoy4j0aYgqi8goBfDrLtbAF9cio6YzYOYfMBKxtJEPl8PDEmP2QpaaZe3UJiQaNmUbM+SZExGftHejUXWc8fJBAAoNmwyIRYhJS0zJy8wuKyyoQiUSMSYBSyGSBGViUQyGWKWS6PQwfT020Mw2YABlkVxDpZjrZZtxhOhaMhIHIAErsPDlbi9XEWQQE06hO4PYL2Z6IGJNWrxWIARjiwo8gvFpQqiEF2VqHii9RigtysKBXW6IHoqAgcDCG36aKGDD2pnGeOZ1hOrnoYQ5TzuLxiiX+0vitUScSKeUaySaiU6Gv1qIMRuM2MwjKOlsJ9mJpPJEFtgU5bNAL3BgqYEqyLQKHhzxUlAMSgsSSXlgqyCoVgtiVcRICDWxDuyY4Z1EHNUyt9v8yd7EUQGazgpiOYKeYLfylCEF8qY8Xz+fSc6ycSdDabA3RxqTjy5DulBRds4ytWSF8vV8vUXVHSAA */
  return createMachine(
    {
      tsTypes: {} as import("./LoadUserInformationMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          "Fetch user information": {
            data: UserInformation;
          };
        },
        events: {} as LoadUserInformationMachineEvents,
        context: {} as LoadUserInformationMachineContext,
      },
      context: { userInformation: undefined },
      id: "loardUserInformationMachine",
      initial: "Fetching user information",
      states: {
        "Fetching user information": {
          invoke: {
            src: "Fetch user information",

            onDone: {
              actions: "Assign loaded user information to context",
              target: "Loaded user information",
            },

            onError: [
              {
                target: "Loading user information failed",
                actions: "send failure to parent"
              },
            ],
          },
        },
        "Loading user information failed": {

          on: {
            "Retry loading user information": {
              target: "Fetching user information",
            },
          },
        },
        "Loaded user information": {
          type: "final",
        },
      },
    },
    {
      actions: {

        "Assign loaded user information to context": assign({
          userInformation: (_context, event) => {
            return event.data;
          },
        }),

        "send failure to parent": sendParent({
          type: "Loading user information failed"
        }),


      },

      services: {
        "Fetch user information": async () =>
          await fetchUserInformation(),
      },
    }
  )
}