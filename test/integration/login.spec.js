describe("Login page", () => {
  it("Login into account - load login form", () => {
    cy.visit("/zaloguj");
    cy.get("input").should("have.length", 2);
    cy.get("input#input-email").should("have.length", 1);
    cy.get("input#input-password").should("have.length", 1);
    cy.get("button[type=submit]").should("have.length", 1);
    cy.get("button[type=submit]").should("be.disabled");
    cy.get("form>p> a")
      .should("have.length", 1)
      .should("have.text", "Załóż je");
  });

  it("Login into account as admin", () => {
    cy.visit("/zaloguj");
    cy.get("input#input-email").type("admin@admin.com");
    cy.get("input#input-password").type("admin");
    cy.get("button").click();
    cy.get("div.details").should("contain", "admin@admin.com");
  });

  it("Login into account - wrong pass", () => {
    cy.visit("/zaloguj");
    cy.get("input#input-email").type("admin@admin.com");
    cy.get("input#input-password").type("admin1");
    cy.get("button").click();
    cy.get("div.alert-danger").should("contain", "Niepoprawne hasło");
  });

  it("Login into account - wrong email", () => {
    cy.visit("/zaloguj");
    cy.get("input#input-email").type("admin-wrong@admin.com");
    cy.get("input#input-password").type("admin");
    cy.get("button").click();
    cy.get("div.alert-danger").should(
      "contain",
      "Nie znaleziono użytkownika o podanym adresie email"
    );
  });
});
