import { fetchUserCart, fetchUserInformation } from "@/services/UserService";
import type { UserCart, UserInformation } from "@/type";
import { assign, createMachine } from "xstate";
import { done } from "xstate/lib/actions";

type LoadUserInformationMachineEvents = {
  type: "User pressed load user data button";
} | {
  type: "User pressed reset machine button"
};

type LoadUserInformationMachineContext = {
  userInformation?: UserInformation;
  userCart?: UserCart;
};

export const createLoadUserInformationMachine = () => {
  return createMachine(
    {
      id: "loadUserInformationMachine",
      tsTypes: {} as import("./LoadUserInformationMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          "Fetch user information": {
            // The data that gets returned from the service
            data: UserInformation;
          };
          "Fetch user cart": {
            data: UserCart
          }
        },
        events: {} as LoadUserInformationMachineEvents,
        context: {} as LoadUserInformationMachineContext,
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

          states: {

            "Loading user information": {
              initial: "Fetching user information from server",
              states: {

                "Fetching user information from server": {
                  invoke: {
                    src: "Fetch user information",

                    onDone: {
                      target: "Loaded user information",
                      actions: "Assign loaded user information to context",
                    },

                    onError: {
                      target: "Loading user information failed",
                    },
                  },
                },

                "Loading user information failed": {
                  tags: "Loading user information failed",
                  // should retry for specific data only
                  on: {
                    "User pressed load user data button": {
                      target: "Fetching user information from server",
                    },
                  },
                },

                "Loaded user information": {
                  tags: "Finished loading user information",
                  type: "final",
                },
              }
            },

            "Load user cart": {
              initial: "Fetching user cart from server",
              states: {

                "Fetching user cart from server": {
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
                  tags: "Loading user cart failed",
                  // should retry for specific data only
                  on: {
                    "User pressed load user data button": {
                      target: "Fetching user cart from server",
                    },
                  },
                },

                "Loaded user cart": {
                  tags: "Finished loading user cart",
                  type: "final",
                },
              }
            }
          }
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
        "Assign loaded user information to context": assign({
          userInformation: (_context, event) => {
            return event.data;
          },
        }),
        "Assign loaded user cart to context": assign({
          userCart: (_context, event) => {
            return event.data
          }
        }),

        "Reset machine context": assign({
          userCart: (_context, _event) => undefined,
          userInformation: (_context, _event) => undefined
        })
      },
      services: {
        "Fetch user information": async () =>
          await fetchUserInformation(),
        "Fetch user cart": async () =>
          await fetchUserCart()
      },
    }
  );
};
