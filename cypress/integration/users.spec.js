import { URLS } from "../../src/routes";

describe("Users Page", () => {
    beforeEach(() => {
        cy.login();
        cy.visit("http://localhost:3000/" + URLS.DASHBOARD.LIST.INDEX);
    });
    it("users page => render page", () => {
        cy.get('[data-testid="common-block"]').should("have.length", 1);
        cy.get('[data-testid="common-table-row"]').should(
            "have.length.at.least",
            1
        );
        cy.get('[data-testid="common-button"]').should("have.length.at.least", 1);
    });
    it("users page => add new user", () => {
        cy.get('[data-testid="common-button"]').eq(0).click();
        cy.url().should(
            "be.equal",
            "http://localhost:3000/" + URLS.DASHBOARD.LIST.NEW_USER
        );
        cy.get('[data-testid="common-text-field"]').should("have.length", 6);
        cy.get('[data-testid="common-text-field"]')
            .eq(0)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(2)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(3)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(4)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(5)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-button"]').should("have.length", 1).click();
    });
    it("users page => update user", () => {
        cy.get('[data-testid="common-button"]')
            .should("have.length.at.least", 2)
            .eq(1)
            .click();
        cy.get('[data-testid="common-modal"]').should("have.length", 1);
        cy.get('[data-testid="common-text-field"]').should("have.length", 6);
        cy.get('[data-testid="common-text-field"]')
            .eq(0)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(2)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(3)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(4)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-text-field"]')
            .eq(5)
            .click()
            .focus()
            .type("test");
        cy.get('[data-testid="common-button"]')
            .should("have.length.at.least", 1)
            .last()
            .click();
    });
});
