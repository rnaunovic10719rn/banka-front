import { URLS } from "../../src/routes";

describe("Information Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/" + URLS.DASHBOARD.INFORMATION);
  });

  it("information page => render page", () => {
    cy.get('[data-testid="common-block"]').should("have.length", 1);
    cy.get('[data-testid="common-button"]').should("have.length", 5);
  });
  it("information page => change data", () => {
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-text-field"]').should("have.length", 5);
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .clear()
      .type("test");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .clear()
      .type("test");
    cy.get('[data-testid="common-text-field"]')
      .eq(2)
      .click()
      .focus()
      .clear()
      .type("test");
    cy.get('[data-testid="common-text-field"]')
      .eq(3)
      .click()
      .focus()
      .clear()
      .type("test");
    cy.get('[data-testid="common-text-field"]')
      .eq(4)
      .click()
      .focus()
      .clear()
      .type("test");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should(
      "have.text",
      "Uspesno promenjeni podaci"
    );
  });
  it("information page => inserted password doesn't have 8 characters, any number or an uppercase letter", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("sifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("sifra");
    cy.get('[data-testid="common-button"]').should("not.be.disabled");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should(
      "have.text",
      "Promena šifre nije uspela. Nisu ispunjeni sledeći uslovi:\n" +
        "Šifra ima manje od 8 karaktera.\n" +
        "Šifra ne sadrži nijedno veliko slovo.\n" +
        "Šifra ne sadrži nijednu cifru.\n"
    );
  });
  it("information page => inserted password without uppercase letter or any number", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("novasifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("novasifra");
    cy.get('[data-testid="common-button"]').should("not.be.disabled");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should(
      "have.text",
      "Promena šifre nije uspela. Nisu ispunjeni sledeći uslovi:\n" +
        "Šifra ne sadrži nijedno veliko slovo.\n" +
        "Šifra ne sadrži nijednu cifru.\n"
    );
  });
  it("information page => inserted password with an uppercase letter but without numbers", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("Novasifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("Novasifra");
    cy.get('[data-testid="common-button"]').should("not.be.disabled");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should(
      "have.text",
      "Promena šifre nije uspela. Nisu ispunjeni sledeći uslovi:\n" +
        "Šifra ne sadrži nijednu cifru.\n"
    );
  });
  it("information page => alert disappears when the X button is pressed", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("novasifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("novasifra");
    cy.get('[data-testid="common-button"]').should("not.be.disabled");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should(
      "have.text",
      "Promena šifre nije uspela. Nisu ispunjeni sledeći uslovi:\n" +
        "Šifra ne sadrži nijedno veliko slovo.\n" +
        "Šifra ne sadrži nijednu cifru.\n"
    );
    cy.get('[data-testid="common-exit-button"]').eq(0).click();
    cy.get('[data-testid="common-alert"]').should("have.length", 0);
  });
  it("information page => inserted passwords don't match", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("Novasifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("novasifra");
    cy.get('[data-testid="common-button"]').should("be.disabled");
  });
  it("information page => insert valid password, change password and redirect to information page", () => {
    cy.get('[data-testid="common-button"]').eq(1).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR
    );
    cy.get('[data-testid="common-text-field"]').should("have.length", 2);
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(0)
      .click()
      .focus()
      .type("Admin123");
    cy.get('[data-testid="common-button"]').should("be.disabled");
    cy.get('[data-testid="common-text-field"]')
      .eq(1)
      .click()
      .focus()
      .type("Admin123");
    cy.get('[data-testid="common-button"]').should("not.be.disabled");
    cy.get('[data-testid="common-button"]').eq(0).click();
    cy.url().should(
      "be.equal",
      "http://localhost:3000/" + URLS.DASHBOARD.INFORMATION
    );
  });
  it("information page => dark mode turned on", () => {
    cy.get('[data-testid="common-button"]').eq(4).click();
    cy.get('html[class*="dark"]').should("be.visible");
  });
  it("information page => dark mode turned off", () => {
    cy.get('[data-testid="common-button"]').eq(4).click();
    cy.get("html").should("have.class", "dark");
    cy.get('[data-testid="common-button"]').eq(4).click();
    cy.get("html").should("not.have.class", "dark");
  });
});
