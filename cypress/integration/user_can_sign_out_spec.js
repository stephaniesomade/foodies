describe("sign out", () =>{
  it("user can sign out", () =>{
      // sign in
      cy.visit("/sessions/new?");
      cy.get('input[name=email]').type("someone@example.com");
      cy.get('input[name=password]').type("password");
      cy.get('#submit').click();
      cy.url().should('include','/');
      
      // sign out
      cy.get('#log_out').click();
      cy.url().should('include','/sessions/new');
    });
  });