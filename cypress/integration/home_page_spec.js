describe("Home page", () =>{
  it("has a title", () =>{
    cy.visit("/");
    cy.contains("Home");
  });
});