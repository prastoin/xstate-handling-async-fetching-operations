import { FetchUserCartResponseBody, FetchUserInformationResponseBody, SERVER_ENDPOINT } from "@/type";
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  rest.get<undefined, Record<string, never>, FetchUserInformationResponseBody>(
    `${SERVER_ENDPOINT}/user-information`,
    (_req, res, ctx) => {
      const shouldFail = faker.datatype.boolean()
      if (shouldFail) {
        return res(
          ctx.delay(900),
          ctx.status(403)
        );
      }

      const body = {
        email: faker.internet.email(),
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
      };
      return res(
        ctx.delay(700),
        ctx.status(200),
        ctx.json(body)
      );
    }
  ),

  rest.get<undefined, Record<string, never>, FetchUserCartResponseBody>(
    `${SERVER_ENDPOINT}/user-cart`,
    (_req, res, ctx) => {
      const shouldFail = faker.datatype.boolean()
      if (shouldFail) {
        return res(
          ctx.delay(800),
          ctx.status(403)
        );
      }

      const body: FetchUserCartResponseBody = {
        items: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => faker.commerce.product()),
        totalPrice: faker.datatype.number()
      }
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(body)
      );
    }
  ),

];
