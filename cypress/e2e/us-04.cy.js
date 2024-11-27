describe("us# 4", () => {
  it("Verify if the user can view children's archived files", () => {
    cy.loginHome();

  });

  it("Verify if admin can view both home care and children’s archived files", () => {
    cy.loginSuper();
  });
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
