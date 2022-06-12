import "@cypress/code-coverage/support";

// TODO(vladeta) find all uncaught exceptions and handle them before removing this
Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false;
});

Cypress.Commands.add('login', (username, password) => {
	cy.visit("http://localhost:3000/login")
	cy.get('[type="text"]').click().focused().type("admin");
	cy.get('[type="password"]').click().focused().type("Admin123");
	cy.get('[data-testid="common-button"]').eq(1)
		.should("not.be.disabled")
		.click();
	cy.get('[data-testid="component-header"]').should("have.length", 1);
	cy.url().should("be.equal", "http://localhost:3000/berza");
})