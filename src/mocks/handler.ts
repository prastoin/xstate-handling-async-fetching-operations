import {
  FetchUserCartResponseBody,
  FetchUserInformationResponseBody,
  SERVER_ENDPOINT,
  UserCart,
  UserInformation,
} from "../type";
import { rest } from "msw";
import { faker } from "@faker-js/faker";

type MswRest = typeof rest;

function getUserInformation(): UserInformation {
  return {
    email: faker.internet.email(),
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

function getUserCart(): UserCart {
  return {
    items: Array.from(
      { length: faker.datatype.number({ min: 1, max: 10 }) },
      () => faker.commerce.product()
    ),
    totalPrice: faker.datatype.number(),
  };
}

export function UserInformationFailingHandler(windowRest: MswRest) {
  return windowRest.get<
    undefined,
    Record<string, never>,
    FetchUserInformationResponseBody
  >(`${SERVER_ENDPOINT}/user-information`, (_req, res, ctx) => {
    return res.once(ctx.status(403));
  });
}

export function UserInformationSuccessHandler(windowRest: MswRest) {
  return windowRest.get<
    undefined,
    Record<string, never>,
    FetchUserInformationResponseBody
  >(`${SERVER_ENDPOINT}/user-information`, (_req, res, ctx) => {
    const body = getUserInformation();
    return res.once(ctx.status(200), ctx.json(body));
  });
}

export function UserCartFailingHandler(windowRest: MswRest) {
  return windowRest.get<
    undefined,
    Record<string, never>,
    FetchUserCartResponseBody
  >(`${SERVER_ENDPOINT}/user-cart`, (_req, res, ctx) => {
    return res.once(ctx.status(403));
  });
}

export function UserCartSuccessHandler(windowRest: MswRest) {
  return windowRest.get<
    undefined,
    Record<string, never>,
    FetchUserCartResponseBody
  >(`${SERVER_ENDPOINT}/user-cart`, (_req, res, ctx) => {
    const body = getUserCart();

    return res.once(ctx.status(200), ctx.json(body));
  });
}

export const handlers = [
  rest.get<undefined, Record<string, never>, FetchUserInformationResponseBody>(
    `${SERVER_ENDPOINT}/user-information`,
    (_req, res, ctx) => {
      const shouldFail = faker.datatype.boolean();
      if (shouldFail) {
        return res(ctx.delay(900), ctx.status(403));
      }

      const body = getUserInformation();
      return res(ctx.delay(700), ctx.status(200), ctx.json(body));
    }
  ),

  rest.get<undefined, Record<string, never>, FetchUserCartResponseBody>(
    `${SERVER_ENDPOINT}/user-cart`,
    (_req, res, ctx) => {
      const shouldFail = faker.datatype.boolean();
      if (shouldFail) {
        return res(ctx.delay(800), ctx.status(403));
      }

      const body = getUserCart();
      return res(ctx.delay(1000), ctx.status(200), ctx.json(body));
    }
  ),
];
