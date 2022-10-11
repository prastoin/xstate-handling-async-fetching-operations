/// <reference types="cypress" />

import { createMachine } from "xstate";
import { createModel } from "@xstate/test";
import {
  UserCartFailingHandler,
  UserCartSuccessHandler,
  UserInformationFailingHandler,
  UserInformationSuccessHandler,
} from "../../src/mocks/handler";

const testLoadUserDataMachine = createMachine({
  id: "load user data test machine",
  initial: "User is on home",
  states: {
    "User is on home": {
      on: {
        "Make both requests success": {
          target: "Loaded user data successfully",
        },

        "Make both requests fail": {
          target: "Loading user data failed",
        },

        "Make User Cart request failed": {
          target: "Loading user data failed",
        },

        "Make User Information request failed": {
          target: "Loading user data failed",
        },
      },

      meta: {
        test: () => {
          cy.contains(/Idle/i);
        },
      },
    },

    "Loaded user data successfully": {
      meta: {
        test: function () {
          cy.contains(/.*Reached final state.*/i);
        },
      },
    },

    "Loading user data failed": {
      on: {
        "User pressed retry button": {
          target: "Loaded user data successfully",
        },
      },

      meta: {
        test: function ({
          loadUserCartShouldFail,
          loadUserInformationShouldFail,
        }: TestingContext) {
          cy.get('[data-cy="retry-button"]');
          
          if (
            loadUserCartShouldFail === false &&
            loadUserInformationShouldFail === false
          ) {
            throw new Error(
              "At least one of the request must be expected to fail"
            );
          }

          if (loadUserInformationShouldFail) {
            cy.get('[data-cy="user-information-loading-container"]').contains(
              /user.*information.*failed/i
            );
          }
          if (loadUserCartShouldFail) {
            cy.get('[data-cy="user-cart-loading-container"]').contains(
              /user.*cart.*failed/i
            );
          }
        },
      },
    },
  },
});

type TestingContext = {
  loadUserCartShouldFail?: boolean;
  loadUserInformationShouldFail?: boolean;
};

const loadUserDataModel = createModel<TestingContext>(testLoadUserDataMachine, {
  events: {
    "Make both requests success": {
      exec: (context) => {
        cy.window()
          .its("msw")
          .then((msw) => {
            const { worker, rest } = msw;

            worker.use(
              UserCartSuccessHandler(rest),
              UserInformationSuccessHandler(rest)
            );

            context.loadUserCartShouldFail = false;
            context.loadUserInformationShouldFail = false;
          });

        cy.get('[data-cy="load-user-data-button"]').click();
      },
    },

    "Make both requests fail": {
      exec: (context) => {
        cy.window()
          .its("msw")
          .then((msw) => {
            const { worker, rest } = msw;

            worker.use(
              UserCartFailingHandler(rest),
              UserInformationFailingHandler(rest)
            );

            context.loadUserCartShouldFail = true;
            context.loadUserInformationShouldFail = true;
          });

        cy.get('[data-cy="load-user-data-button"]').click();
      },
    },

    "Make User Cart request failed": {
      exec: (context) => {
        cy.window()
          .its("msw")
          .then((msw) => {
            const { worker, rest } = msw;

            worker.use(
              UserCartFailingHandler(rest),
              UserInformationSuccessHandler(rest)
            );

            context.loadUserCartShouldFail = true;
            context.loadUserInformationShouldFail = false;
          });

        cy.get('[data-cy="load-user-data-button"]').click();
      },
    },

    "Make User Information request failed": {
      exec: (context) => {
        cy.window()
          .its("msw")
          .then((msw) => {
            const { worker, rest } = msw;

            worker.use(
              UserCartSuccessHandler(rest),
              UserInformationFailingHandler(rest)
            );

            context.loadUserCartShouldFail = false;
            context.loadUserInformationShouldFail = true;
          });

        cy.get('[data-cy="load-user-data-button"]').click();
      },
    },

    "User pressed retry button": {
      exec: (context) => {
        cy.window()
          .its("msw")
          .then((msw) => {
            const { worker, rest } = msw;

            worker.use(
              UserCartSuccessHandler(rest),
              UserInformationSuccessHandler(rest)
            );

            context.loadUserCartShouldFail = false;
            context.loadUserInformationShouldFail = false;
          });

        cy.get('[data-cy="retry-button"]').click();
      },
    },
  },
});

describe("Load user data", () => {
  const testPlans = loadUserDataModel.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          return cy.visit("/").then(() => {
            return path.test({
              loadUserCartShouldFail: undefined,
              loadUserInformationShouldFail: undefined,
            });
          });
        });
      });
    });
  });

  describe("coverage", () => {
    it("should have full coverage", () => {
      return loadUserDataModel.testCoverage();
    });
  });
});
