// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.loardUserInformationMachine.Fetching user information:invocation[0]": {
      type: "done.invoke.loardUserInformationMachine.Fetching user information:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.loardUserInformationMachine.Fetching user information:invocation[0]": {
      type: "error.platform.loardUserInformationMachine.Fetching user information:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch user information": "done.invoke.loardUserInformationMachine.Fetching user information:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "Assign loaded user information to context": "done.invoke.loardUserInformationMachine.Fetching user information:invocation[0]";
    "send failure to parent": "error.platform.loardUserInformationMachine.Fetching user information:invocation[0]";
  };
  eventsCausingServices: {
    "Fetch user information": "Retry loading user information" | "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Fetching user information"
    | "Loaded user information"
    | "Loading user information failed";
  tags: never;
}
