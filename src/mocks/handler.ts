import { FetchUserInformationResponseBody, SERVER_ENDPOINT, UserCart } from "@/type";
import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  rest.get<undefined, Record<string, never>, FetchUserInformationResponseBody>(
    `${SERVER_ENDPOINT}/user-information`,
    (_req, res, ctx) => {
      console.log("/user-information mock hit");
      sessionStorage.setItem("is-authenticated", "true");

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          email: faker.internet.email(),
          id: faker.datatype.uuid(),
          name: faker.internet.userName(),
          password: faker.internet.password(),
        })
      );
    }
  ),

  rest.get<undefined, Record<string, never>, UserCart>(
    `${SERVER_ENDPOINT}/user-cart`,
    (_req, res, ctx) => {
      console.log("/user-cart mock hit");
      sessionStorage.setItem("is-authenticated", "true");
      
      // return res(
      //   ctx.delay(2000),
      //   ctx.status(403)
      // );

      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.json({
          items: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => faker.commerce.product()),
          totalPrice: faker.datatype.number()
        })
      );
    }
  ),

];
