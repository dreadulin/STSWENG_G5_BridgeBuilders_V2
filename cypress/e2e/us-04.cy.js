describe("US# 4", () => {
  it("Verify if the user can view children's archived files", () => {
    cy.login("gege", "akutami");
    cy.url().should("contain", "dashboard");
    cy.get("a").contains("/archive");
  });

  it("Verify if admin can view both home care and children’s archived files", () => {});
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
