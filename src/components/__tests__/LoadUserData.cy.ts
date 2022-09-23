import LoadUserInformation from "../LoadUserInformation.vue";

describe("LoadUserData", () => {
    it("Renders properly the page", () => {
        cy.mount(LoadUserInformation);
        // cy.get('[data-cy="submit"]').click()	
        cy.get('[data-cy="machine-current-value"]').invoke('text').should('match', /idle/i)
    });
});
