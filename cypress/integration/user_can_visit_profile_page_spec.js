describe("Profile page", () =>{
  it("A user signs in and see their profile page", ()=>{
    // sign in and go to profile page
    cy.visit("/sessions/new?");
    cy.get('input[name=email]').type("someone@example.com");
    cy.get('input[name=password]').type("password");
    cy.get('#submit').click();
    // profile page
    cy.visit("/users/profile");
    cy.contains("Profile Page")
  });
});