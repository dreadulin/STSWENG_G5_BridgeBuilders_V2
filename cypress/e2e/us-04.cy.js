describe("US# 4", () => {
  it("Verify if the user can view children's archived files", () => {
    cy.login("gege", "akutami");
    cy.visit('/overview')
    cy.get('a[href="/archive"]').click()
    
    cy.get('button').contains('User Profiles').click()

    cy.get('button').contains('Attached Files').click()
  });

  it("Verify if admin can view both home care and children’s archived files", () => {
    /*
    cy.login("STSWENG", "stsweng");
    cy.visit('/overview')
    cy.get('a[href="/archive"]').click()

    cy.get('button').contains('User Profiles').click()

    cy.get('button').contains('Attached Files').click()
    */
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
