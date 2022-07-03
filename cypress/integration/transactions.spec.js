import { URLS } from "../../src/routes";

describe("Transactions Page", () => {
    beforeEach(() => {
        cy.login()
        cy.visit("http://localhost:3000/" + URLS.DASHBOARD.APPROVE_TRANSACTION)
    })
    it("capital page => render page", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-table-row"]').should('have.length.at.least', 1)
    });
})
