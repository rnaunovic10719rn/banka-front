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
    it("stocks page => search with valid data => clearing text area", () => {
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("AAPL")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-table-row"]').should('have.length',1)
        cy.get('[data-testid="common-table-row"]').eq(0).should("contain","AAPL")
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
        cy.get('[data-testid="common-table-row"]').should('have.length.at.least',2)
    });
    it("stocks page => clear button appearing and disappearing", () => {
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("a")
        cy.get('[data-testid="common-button"]').eq(4).should("have.text","Clear")
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
        cy.get('[data-testid="common-button"]').eq(4).should("not.exist")
    });
    it("stocks page => search with invalid data => catching error message => closing error message", () => {
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("AVSDADSADC")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-alert"]').should('have.length.at.least',1)
        cy.get('[data-testid="common-alert"]').eq(0).should('have.text', "Nema podataka za datu pretragu")
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-exit-button"]').eq(0).click()
    });
    it("stocks page => forex page => search with valid data => clearing text areas", () => {
        cy.get('[data-testid="common-button"]').eq(1).click()
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("EUR")
        cy.get('[data-testid="common-text-field"]').eq(1).click().focus().type("RSD")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-table-row"]').should('have.length',1)
        cy.get('[data-testid="common-table-row"]').eq(0).should("contain","EUR").should("contain","RSD")
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
        cy.get('[data-testid="common-text-field"]').eq(1).should('have.value', '')
    });
    it("stocks page => forex page => search with invalid data => cathcing error and closing => clearing text areas", () => {
        cy.get('[data-testid="common-button"]').eq(1).click()
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("NNVALUTA")
        cy.get('[data-testid="common-text-field"]').eq(1).click().focus().type("NNVALUTA")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-alert"]').should('have.length.at.least',1)
        cy.get('[data-testid="common-alert"]').eq(0).should('have.text', "Nema podataka za datu pretragu")
        cy.get('[data-testid="common-exit-button"]').eq(0).click()
        cy.get('[data-testid="common-alert"]').should('have.length',0)
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
        cy.get('[data-testid="common-text-field"]').eq(1).should('have.value', '')
    });
    it("stocks page => forex page => fill only one input and search => cathcing error and closing => clearing text areas", () => {
        cy.get('[data-testid="common-button"]').eq(1).click()
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("EUR")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-alert"]').should('have.length.at.least',1)
        cy.get('[data-testid="common-alert"]').eq(0).should('have.text', "Nema podataka za datu pretragu")
        cy.get('[data-testid="common-exit-button"]').eq(0).click()
        cy.get('[data-testid="common-alert"]').should('have.length',0)
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
        cy.get('[data-testid="common-text-field"]').eq(1).should('have.value', '')
    });
    it("stocks page => futures page => search with valid data => clearing text area", () => {
        cy.get('[data-testid="common-button"]').eq(2).click()
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("FBTSH2022")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-table-row"]').should('have.length',1)
        cy.get('[data-testid="common-table-row"]').eq(0).should("contain","FBTSH2022")
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
    });
    it("stocks page => futures page => search with invalid data => cathcing error and closing => clearing text area", () => {
        cy.get('[data-testid="common-button"]').eq(2).click()
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("NNVALUTA")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-alert"]').should('have.length.at.least',1)
        cy.get('[data-testid="common-alert"]').eq(0).should('have.text', "Nema podataka za datu pretragu")
        cy.get('[data-testid="common-exit-button"]').eq(0).click()
        cy.get('[data-testid="common-alert"]').should('have.length',0)
        cy.get('[data-testid="common-button"]').eq(4).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.value', '')
    });
    it("stocks page => change tab should clear text area", () => {
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("NNVALUTA")
        cy.get('[data-testid="common-button"]').eq(1).click()
        cy.get('[data-testid="common-button"]').eq(0).click()
        cy.get('[data-testid="common-text-field"]').eq(0).should('have.text','')
    });
    it("stocks page => change tab should rerender starting table after search", () => {
        cy.get('[data-testid="common-text-field"]').eq(0).click().focus().type("AAPL")
        cy.get('[data-testid="common-button"]').eq(3).click()
        cy.get('[data-testid="common-table-row"]').should('have.length',1)
        cy.get('[data-testid="common-button"]').eq(1).click()
        cy.get('[data-testid="common-button"]').eq(0).click()
        cy.get('[data-testid="common-table-row"]').should('have.length.at.least',2)
    });
});
