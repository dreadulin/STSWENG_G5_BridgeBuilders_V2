describe("User Story# 4", () => {
  beforeEach(() => {
    cy.intercept("/api/years", { body: [2022, 2023, 2024] });
    cy.intercept("/api/overview*").as("overview");
    cy.intercept("/api/archivedFiles?*").as("archivedFiles");
  });

  it("Verify if the user can view children's archived files", () => {
    cy.loginHome();
    cy.get("[href='/archive']").click();
    cy.get("button").contains("Profiles").click();
    cy.get("button").should('contain', 'Files');

    cy.contains("2024").click();
    cy.wait("@archivedFiles");

    cy.contains("2023").click();
    cy.wait("@archivedFiles");

    cy.contains("2022").click();
    cy.wait("@archivedFiles");


    cy.logout();

    cy.loginComm();
    cy.get("[href='/archive']").click();
    cy.get("button").contains("Profiles").click();
    cy.get("button").should('contain', 'Files');

    cy.contains("2024").click();
    cy.wait("@archivedFiles");

    cy.contains("2023").click();
    cy.wait("@archivedFiles");

    cy.contains("2022").click();
    cy.wait("@archivedFiles");
  });

  it("Verify if admin can view both home care and children’s archived files", () => {
    cy.loginSuper();
  
    cy.get("[href='/archive']").click();
    cy.contains("Profiles").click();
    cy.wait("@archivedFiles");

    cy.contains("Community").click();
    cy.wait("@archivedFiles");

    cy.contains("2024").click();
    cy.wait("@archivedFiles");

    cy.contains("2023").click();
    cy.wait("@archivedFiles");

    cy.contains("2022").click();
    cy.wait("@archivedFiles");


    cy.contains("Home").click();
    cy.wait("@archivedFiles");

    cy.contains("2024").click();
    cy.wait("@archivedFiles");
    
    cy.contains("2023").click();
    cy.wait("@archivedFiles");
    
    cy.contains("2022").click();
    cy.wait("@archivedFiles");
  });

  it("Verify if archiving date is displayed correctly", () => {
    cy.loginHome();
    cy.get('[href="/archive"]').click();
    cy.get("button").contains("Profiles").click();
    cy.wait("@archivedFiles");
    
    cy.contains("2024").click();

    cy.get("p").contains("Date Uploaded:").should('exist');
  })

  it("Verify if the staff cannot access archived files in the wrong category", () => {
    cy.loginHome();
    cy.get('[href="/archive"]').click();
    cy.get("button").contains("Profiles").click();
    cy.wait("@archivedFiles");
    cy.get("button").eq(1).should('not.contain',"Community");


    cy.loginComm();
    cy.get('[href="/archive"]').click();
    cy.get("button").contains("Profiles").click();
    cy.wait("@archivedFiles");
    cy.get("button").eq(1).should('not.contain',"Home");
  })
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
