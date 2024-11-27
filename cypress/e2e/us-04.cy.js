describe("User Story# 4", () => {
  beforeEach(() => {
    cy.intercept("/api/years", {body: [2024]})
    cy.intercept("/api/overview*&year=2024*").as("overview");
    cy.intercept("/profile/*").as("profile");

  })
  it("Verify if the user can view children's archived files", () => {
    cy.loginHome();
    cy.get("[href='/archive']").click();
  });

  /*
  it("Verify if admin can view both home care and children’s archived files", () => {
    cy.loginSuper();
  });
  */
});

/*
describe(
  "Verify if admin can view " + "both home care and children’s archived files",
  () => {
    it("passes", () => {
      cy.visit("/");
    });
  }
);

describe("Verify if the user can view children's archieved files", () => {
  it("passes", () => {
    cy.visit("/");
  });
});

describe(
  "Verify if the staff cannot access archived files in the wrong category",
  () => {
    it("passes", () => {
      cy.visit("/");
    });
  }
);
*/
