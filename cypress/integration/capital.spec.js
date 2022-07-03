import { URLS } from "../../src/routes";

describe("Capital Page", () => {
    beforeEach(() => {
        cy.login()
        cy.visit("http://localhost:3000/" + URLS.DASHBOARD.CAPITAL.INDEX)
    })
    it("capital page => render blocks", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 2)
    });
    it("capital page => cash block => should have at least one row", () => {
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
    });
    it("capital page => cash block => add funds", () => {
        cy.get(':nth-child(2) > [data-testid="common-button"]')
            .click()
        cy.get('[data-testid="common-select"]')
            .select("RSD")
        cy.get('[data-testid="common-text-field"]')
            .click()
            .focus()
            .type("10000")
        cy.get('[data-testid="common-button"]')
            .should('have.length', 2)
            .eq(1)
            .click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    });
    it("capital page => cash block => table click => click should open transaction modal", () => {
        cy.wait(1000)
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .eq(0)
            .click()
        cy.get('[data-testid="common-modal"]').should("have.length", 1).click()
        cy.get('[data-testid="common-table-row"]').should("have.length.at.least", 1)
    });
    it("capital page => capital block => should have at least one row", () => {
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
    });
    it("capital page => capital block => table row => click should redirect to another page", () => {
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 5)
            .eq(3)
            .click()
        cy.url().should("be.equal", `http://localhost:3000/${URLS.DASHBOARD.CAPITAL.INDEX}/checking/AKCIJA`);
    });
    it("capital single page => table row => click should open modal with info", () => {
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 5)
            .eq(3)
            .click()
        cy.url().should("be.equal", `http://localhost:3000/${URLS.DASHBOARD.CAPITAL.INDEX}/checking/AKCIJA`);
        cy.get('[data-testid="common-table-row"]')
            .should('have.length.at.least', 1)
            .click()
        cy.get('[data-testid="common-modal"]').should("have.length", 1)
    });

    it("capital page => margin block => add funds", () => {
        cy.get('[data-testid="common-tab-item"]')
            .eq(1)
            .click()
        cy.get(':nth-child(2) > [data-testid="common-button"]')
            .click()
        cy.get('[data-testid="common-text-field"]')
            .click()
            .focus()
            .type("1000")
        cy.get('[data-testid="common-button"]')
            .eq(2)
            .click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    });

    it("capital page => margin block => render margin modal", () => {
        cy.get('[data-testid="common-tab-item"]')
            .eq(1)
            .click()
        cy.get('[data-testid="common-table-row"]')
            .eq(0)
            .click()
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
    });

    it("capital page => margin block => render margin action modal", () => {
        cy.get('[data-testid="common-tab-item"]')
            .eq(1)
            .click()
        cy.get('[data-testid="common-table-row"]')
            .eq(0)
            .click()
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
    });

    it("capital page => margin block => render margin future modal", () => {
        cy.get('[data-testid="common-tab-item"]')
            .eq(1)
            .click()
        cy.get('[data-testid="common-table-row"]')
            .eq(0)
            .click()
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
    });
})
