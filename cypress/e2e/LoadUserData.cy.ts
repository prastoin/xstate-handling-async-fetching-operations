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
      },

      meta: {
        test: () => {
          cy.get("template").should("contain", /Idle/i);
        },
      },
    },

    "Loaded user data successfully": {
      meta: {
        test: function () {
          cy.contains(/Reached final state/i);
        },
      },
    },

    "Loading user data failed": {
      meta: {
        test: function () {
          cy.get('[data-cy="user-information-loading-container"]').contains(
            /user.*information.*failed/i
          );
          cy.get('[data-cy="user-cart-loading-container"]').contains(
            /user.*cart.*failed/i
          );
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
    "User pressed load user data button": function () {
      cy.get('[data-cy="load-user-data-button"]').click();
    },

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
  },
});

describe("Load user data", () => {
  const testPlans = loadUserDataModel.getShortestPathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, () => {
          cy.visit("/").then(() => {
            path.test({
              loadUserCartShouldFail: undefined,
              loadUserInformationShouldFail: undefined,
            });
          });
        });
      });
    });
  });

  // it("should have full coverage", () => {
  //   return loadUserDataModel.testCoverage();
  // });
});
