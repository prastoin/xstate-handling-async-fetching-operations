import App from "../../App.vue";

describe("App", () => {
  it("renders properly the header", () => {
    cy.mount(App);
    cy.get("template").should(
      "contain",
      /x-state-handling-async-fetching-operations/i
    );
  });
});
