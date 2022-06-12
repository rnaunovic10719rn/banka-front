describe("Trade Page", () => {
    before(() => {
        cy.login()
        cy.visit("http://localhost:3000/trade")
    })
    it("trade page => stocks => render form", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-block-title"]').should('have.length', 1).should('have.text', 'Trgovina')
        cy.get('[data-testid="common-text-field"]').should('have.length', 4)
        cy.get('[data-testid="common-radio-group"]').should('have.length', 1)
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("be.disabled")
    });
    it("trade page => stocks => filled form will enable button", () => {
        cy.get('[data-testid="common-text-field"]').should('have.length', 4)
        cy.get('[data-testid="common-text-field"]')
            .eq(0)
            .click()
            .focus()
            .type("AAPL")
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .click()
            .focus()
            .type("123")
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled")
    });
    it("trade page => stocks => submit valid data", () => {
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled").click()
        cy.get('.rnc__notification-content').should("have.length", 1)
    });
    it("trade page => stocks => invalid input field will show red outline", () => {
        cy.get('[data-testid="common-text-field"]').should('have.length', 4)
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .click()
            .focus()
            .clear()
            .type("asd")
            .should('have.class', 'outline-red-500').clear()
    });
    it("trade page => forex => render form", () => {
        cy.get('[data-testid="common-select"]').should('have.length', 1).select(1)
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-text-field"]').should('have.length', 5)
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("be.disabled")
    });
    it("trade page => forex => filled form will enable button", () => {
        cy.get('[data-testid="common-text-field"]').should('have.length', 5)
        cy.get('[data-testid="common-text-field"]')
            .eq(0)
            .click()
            .focus()
            .type("EUR")
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .click()
            .focus()
            .type("RSD")
        cy.get('[data-testid="common-text-field"]')
            .eq(2)
            .click()
            .focus()
            .type("123")
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled")
    });
    it("trade page => forex => submit valid data", () => {
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled").click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    });
    it("trade page => futures => render form", () => {
        cy.get('[data-testid="common-select"]').should('have.length', 1).select(2)
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-text-field"]').should('have.length', 4)
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("be.disabled")
    });
    it("trade page => futures => filled form will enable button", () => {
        cy.get('[data-testid="common-text-field"]').should('have.length', 4)
        cy.get('[data-testid="common-text-field"]')
            .eq(0)
            .click()
            .focus()
            .type("TEST")
        cy.get('[data-testid="common-text-field"]')
            .eq(1)
            .clear()
            .click()
            .focus()
            .type("123")
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled")
    });
    it("trade page => forex => submit valid data", () => {
        cy.get('[data-testid="common-button"]').should('have.length', 1).should("not.be.disabled").click()
        cy.get('.rnc__notification-content').should("have.length.at.least", 1)
    });
});