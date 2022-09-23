// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.loadUserCartMachine.Fetching user cart:invocation[0]": {
      type: "done.invoke.loadUserCartMachine.Fetching user cart:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch user cart": "done.invoke.loadUserCartMachine.Fetching user cart:invocation[0]";
  };
  missingImplementations: {
    actions: "Assign loaded user cart to context";
    services: "Fetch user cart";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "Assign loaded user cart to context": "done.invoke.loadUserCartMachine.Fetching user cart:invocation[0]";
  };
  eventsCausingServices: {
    "Fetch user cart": "Retry loading user cart" | "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Fetching user cart"
    | "Loaded user cart"
    | "Loading user cart failed";
  tags: never;
}
