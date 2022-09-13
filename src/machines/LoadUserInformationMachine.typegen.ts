// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.loadUserInformationMachine.Loading user information from server:invocation[0]": {
      type: "done.invoke.loadUserInformationMachine.Loading user information from server:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Loading user information from server": "done.invoke.loadUserInformationMachine.Loading user information from server:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "Assign loaded user information to context": "done.invoke.loadUserInformationMachine.Loading user information from server:invocation[0]";
  };
  eventsCausingServices: {
    "Loading user information from server": "User pressed load user information button";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Idle"
    | "Loaded user information"
    | "Loading user information failed"
    | "Loading user information from server";
  tags: never;
}
