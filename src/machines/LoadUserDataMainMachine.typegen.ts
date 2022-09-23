// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.LoadUserCartMachine": {
      type: "done.invoke.LoadUserCartMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.loardUserInformationMachine": {
      type: "done.invoke.loardUserInformationMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "Reset machine context": "User pressed reset machine button";
    "Send retry to loadUserCartMachine": "User pressed global operations retry";
    "Send retry to loadUserInformationMachine": "User pressed global operations retry";
    "assign retrieved user cart to context": "done.invoke.LoadUserCartMachine";
    "assign retrieved user information to context": "done.invoke.loardUserInformationMachine";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Idle"
    | "Load user data"
    | "Load user data.Load user information"
    | "Load user data.Load user information.Invoke loardUserInformationMachine"
    | "Load user data.Load user information.loardUserInformationMachine reached final state"
    | "Load user data.Loading user cart"
    | "Load user data.Loading user cart.Invoke loadUserCartMachine"
    | "Load user data.Loading user cart.loadUserCartMachine reached final state"
    | "Loaded user data"
    | {
        "Load user data"?:
          | "Load user information"
          | "Loading user cart"
          | {
              "Load user information"?:
                | "Invoke loardUserInformationMachine"
                | "loardUserInformationMachine reached final state";
              "Loading user cart"?:
                | "Invoke loadUserCartMachine"
                | "loadUserCartMachine reached final state";
            };
      };
  tags: "Currently loading";
}
