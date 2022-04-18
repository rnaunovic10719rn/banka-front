describe("login", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/login");
		cy.intercept(
			{
				method: "GET",
				url: "/user",
			},
			[]
		).as("getUsers");
	});

	it("login => display form with text fields and button", () => {
		cy.get("form").should("be.visible");
		cy.get("[type='text']").should("be.visible");
		cy.get("[type='password']").should("be.visible");
		cy.get("button").should("be.visible");
	});
});
