// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.loadUserDataMachine.Load user data.Load user cart.Fetching user cart from server:invocation[0]": {
      type: "done.invoke.loadUserDataMachine.Load user data.Load user cart.Fetching user cart from server:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.loadUserDataMachine.Load user data.Loading user information.Fetching user information from server:invocation[0]": {
      type: "done.invoke.loadUserDataMachine.Load user data.Loading user information.Fetching user information from server:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch user cart": "done.invoke.loadUserDataMachine.Load user data.Load user cart.Fetching user cart from server:invocation[0]";
    "Fetch user information": "done.invoke.loadUserDataMachine.Load user data.Loading user information.Fetching user information from server:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "Fetch user information" | "Fetch user cart";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "Assign loaded user cart to context": "done.invoke.loadUserDataMachine.Load user data.Load user cart.Fetching user cart from server:invocation[0]";
    "Assign loaded user information to context": "done.invoke.loadUserDataMachine.Load user data.Loading user information.Fetching user information from server:invocation[0]";
    "Reset machine context": "User pressed reset machine button";
  };
  eventsCausingServices: {
    "Fetch user cart": "User pressed load user data button";
    "Fetch user information": "User pressed load user data button";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Idle"
    | "Load user data"
    | "Load user data.Load user cart"
    | "Load user data.Load user cart.Fetching user cart from server"
    | "Load user data.Load user cart.Loaded user cart"
    | "Load user data.Load user cart.Loading user cart failed"
    | "Load user data.Loading user information"
    | "Load user data.Loading user information.Fetching user information from server"
    | "Load user data.Loading user information.Loaded user information"
    | "Load user data.Loading user information.Loading user information failed"
    | "Loaded user data"
    | {
        "Load user data"?:
          | "Load user cart"
          | "Loading user information"
          | {
              "Load user cart"?:
                | "Fetching user cart from server"
                | "Loaded user cart"
                | "Loading user cart failed";
              "Loading user information"?:
                | "Fetching user information from server"
                | "Loaded user information"
                | "Loading user information failed";
            };
      };
  tags:
    | "Loading user cart"
    | "Loading user cart failed"
    | "Loading user information"
    | "Loading user information failed";
}
