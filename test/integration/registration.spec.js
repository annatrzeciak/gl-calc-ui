describe("Registration page", () => {
  it("Registration page - load registration form", () => {
    cy.visit("/rejestracja");
    cy.get("input").should("have.length", 4);
    cy.get("input#input-name").should("have.length", 1);
    cy.get("input#input-email").should("have.length", 1);
    cy.get("input#input-password").should("have.length", 1);
    cy.get("input#input-repeatPassword").should("have.length", 1);
    cy.get("button[type=submit]").should("have.length", 1);
  });

  it("Registration page - confirm empty form", () => {
    cy.visit("/rejestracja");
    cy.get("button[type=submit]").click();
    cy.get("input.form-control.is-invalid").should("have.length", 4);
    cy.get("div.invalid-feedback").should("have.length", 4);
  });

  it("Registration page - name is too short", () => {
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("Jo");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback:first").should('contain','Nazwa musi zawierać conajmniej 4 znaki')
    cy.get("input#input-name").type("hn");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback").should("have.length", 3);
  });

  it("Registration page - email is invalid", () => {
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("John");
    cy.get("input#input-email").type("John");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback:first").should('contain','Niepoprawny format adresu email')
    cy.get("input#input-email").type("@gmail.com");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback").should("have.length", 2);
  })

  it("Registration page - password is too short", () => {
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("John");
    cy.get("input#input-email").type("john@gmail.com");
    cy.get("input#input-password").type("1234");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback:first").should('contain','Hasło powinno zawierać conajmniej 6 znaków')
    cy.get("input#input-password").type("56");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback").should("have.length", 2);
  });

  it("Registration page - passwords aren't the same ", () => {
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("John");
    cy.get("input#input-email").type("john@gmail.com");
    cy.get("input#input-password").type("123456");
    cy.get("input#input-repeatPassword").type("12345");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback:first").should('contain','Podane hasła nie są identyczne')
    cy.get("input#input-repeatPassword").type("6");
    cy.get("button[type=submit]").click();
    cy.get("div.invalid-feedback").should("have.length", 0);
  });

  it("Registration page - email is used", () => {
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("John");
    cy.get("input#input-email").type("john@gmail.com");
    cy.get("input#input-password").type("123456");
    cy.get("input#input-repeatPassword").type("123456");
    cy.get("button[type=submit]").click();
    cy.get("div.alert.alert-danger").should('contain','Użytkownik o podanym adresie email już istnieje. Zmień adres email lub zaloguj się')
  });

  it("Registration page - create new account - success", () => {
    const random = Math.floor(Math.random() * 100000);
    cy.visit("/rejestracja");
    cy.get("input#input-name").type("John Test "+random);
    cy.get("input#input-email").type(`john.test+${random}@gmail.com`);
    cy.get("input#input-password").type("123456");
    cy.get("input#input-repeatPassword").type("123456");
    cy.get("button[type=submit]").click();
    cy.get("div.alert.alert-success").should('contain','Użytkownik zarejestrowany pomyślnie. Teraz możesz się zalogować')
  });
});
