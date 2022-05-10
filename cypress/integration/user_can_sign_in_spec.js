describe("Authentification", ()=>{

  it("A user signs up", ()=>{
    // sign up
    cy.visit("/users/new");
    cy.get('input[name=name]').type("someone")
    cy.get('input[name=email]').type("someone@example.com");
    cy.get('input[name=password]').type("password");
    cy.get('#submit').click();
  });

  it("A user signs in", ()=>{
    // sign in
    cy.visit("/sessions/new?");
    cy.get('input[name=email]').type("someone@example.com");
    cy.get('input[name=password]').type("password");
    cy.get('#submit').click();
  });
});