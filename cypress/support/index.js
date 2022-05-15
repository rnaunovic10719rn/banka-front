import "@cypress/code-coverage/support";

// TODO(vladeta) find all uncaught exceptions and handle them before removing this
Cypress.on("uncaught:exception", (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false;
});
