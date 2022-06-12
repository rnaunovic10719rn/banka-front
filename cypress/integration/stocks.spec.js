describe("Stocks Page", () => {
    before(() => {
        cy.login()
    })
    it("stocks page => render stocks widget", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-block-title"]').should('have.length', 1).should('have.text', 'Berza')
        cy.get('[data-testid="common-table"]').should('have.length', 1)
    });
    it("stocks page => render stocks widget => render table data", () => {
        cy.get('[data-testid="common-table"]').should('have.length', 1)
        cy.get('[data-testid="common-table-row"]').should('have.length.at.least', 1)
    });
    it("stocks page => render stocks widget => open modal", () => {
        cy.get('[data-testid="common-table-row"]').eq(0).click()
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
    });
    it("stocks page => render stocks widget => close modal", () => {
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
        cy.get('[data-testid="common-exit-button"]').click()
        cy.get('[data-testid="common-modal"]').should('have.length', 0)
    });
    it("stocks page => render forex widget", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-tab"]').should('have.length', 1)
        cy.get('[data-testid="common-tab"] > :nth-child(2)').click()
        cy.get('[data-testid="common-table"]').should('have.length', 1)
        cy.get('[data-testid="common-table-row"]').should('have.length.at.least', 1)
    });
    it("stocks page => forex stocks widget => open modal", () => {
        cy.get('[data-testid="common-table-row"]').eq(0).click()
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
    });
    it("stocks page => render stocks widget => close modal", () => {
        cy.get('[data-testid="common-modal"]').should('have.length', 1)
        cy.get('[data-testid="common-exit-button"]').click()
        cy.get('[data-testid="common-modal"]').should('have.length', 0)
    });
    it("stocks page => render futures widget", () => {
        cy.get('[data-testid="common-block"]').should('have.length', 1)
        cy.get('[data-testid="common-tab"]').should('have.length', 1)
        cy.get('[data-testid="common-tab"] > :nth-child(3)').click()
        cy.get('[data-testid="common-table"]').should('have.length', 1)
    });
});
