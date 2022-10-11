import { setupWorker, rest } from "msw";
import { handlers } from "./handler";

export const worker = setupWorker(...handlers);

export interface MswPayload {
  worker: typeof worker;
  rest: typeof rest;
}

const mswPayload: MswPayload = {
  worker,
  rest,
};

// @ts-ignore TODO improve this
window.msw = mswPayload;
