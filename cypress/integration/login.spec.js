describe("Login Page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });

    it("login form => displays login form", () => {
        cy.get('[data-testid="common-text-field"]').should("have.length", 2);
        cy.get('[data-testid="common-button"]').should("have.length", 2);
        cy.get('[data-testid="common-button"]').should("be.disabled");
    });

    it("login form => fill login form should enable button", () => {
        cy.get('[type="text"]').click().focused().type("user");
        cy.get('[type="password"]').click().focused().type("pass");
        cy.get('[data-testid="common-button"]').should("not.be.disabled");
    });

    it("login form => correct credentials should login user and redirect to dashboard", () => {
        cy.get('[type="text"]').click().focused().type("admin");
        cy.get('[type="password"]').click().focused().type("Admin123");
        cy.get('[data-testid="common-button"]').eq(1)
            .should("not.be.disabled")
            .click();
        cy.get('[data-testid="component-header"]').should("have.length", 1);
        cy.url().should("be.equal", "http://localhost:3000/index");
    });

    it("login form => wrong credentials should alert user", () => {
        cy.get('[type="text"]').click().focused().type("user");
        cy.get('[type="password"]').click().focused().type("pass");
        cy.get('[data-testid="common-button"]').eq(1)
            .should("not.be.disabled")
            .click();
        cy.get('.rnc__notification-content').should("have.length", 1)
    });

    it("reset password => link should display new form", () => {
        cy.get('[data-testid="common-button"]').should("have.length", 2).eq(0).click();
        cy.get('[data-testid="common-text-field"]').should("have.length", 1);
        cy.get('[data-testid="common-button"]').eq(0)
            .should("be.disabled")
            .should("have.text", "Posaljite email");
    });

    it("reset password => submitting valid form should show error", () => {
        cy.get('[data-testid="common-button"]')
            .should("have.length", 2)
            .eq(0)
            .click();
        cy.get('[data-testid="common-text-field"]')
            .should("have.length", 1)
            .click()
            .focus()
            .type("email@email.com");
        cy.get('[data-testid="common-button"]')
            .eq(0)
            .should("not.be.disabled")
            .should("have.text", "Posaljite email")
            .click();
        cy.url().should("be.equal", "http://localhost:3000/login");
    });

    it("reset password => submitting invalid form should show error", () => {
        cy.get('[data-testid="common-button"]').should("have.length", 2).eq(0).click();
        cy.get('[data-testid="common-text-field"]')
            .should("have.length", 1)
            .click()
            .focus()
            .type("user@email.com");
        cy.get('[data-testid="common-button"]')
            .eq(0)
            .should("not.be.disabled")
            .should("have.text", "Posaljite email")
            .click();
        cy.get('.rnc__notification-content').should("have.length", 1)
    });
});
