describe("Can see their bookmark", () =>{
  it("A user signs in, see their profile page and their bookmark", ()=>{
    // sign in and go to profile page
    cy.visit("/sessions/new?");
    cy.get('input[name=email]').type("someone@example.com");
    cy.get('input[name=password]').type("password");
    cy.get('#submit').click();
    // profile page
    cy.visit("/users/profile");
    cy.contains("Profile Page")
    cy.get('button[id="bookmarkButton"]').click()
    cy.contains("Breakfast Potatoes")
  });

  it("Can comment on the bookmark", ()=>{
    // sign in and go to profile page
    cy.visit("/sessions/new?");
    cy.get('input[name=email]').type("someone@example.com");
    cy.get('input[name=password]').type("password");
    cy.get('#submit').click();
    // profile page, see bookmark and add comment
    cy.visit("/users/profile");
    cy.contains("Profile Page")
    cy.get('button[id="bookmarkButton"]').click()
    cy.contains("Breakfast Potatoes")
    cy.get('input[name="message"]').type("Yummy");
    cy.get('#submit').click();
    cy.url().should('include','/users/profile');
    cy.visit("/posts");
    cy.contains("Yummy");
  });
});