describe("User Story# 5", () => {
  beforeEach(() => {
    cy.intercept("/api/years", {body: [2023, 2024]})
    cy.intercept("/api/overview*&year=2024*").as("overview");
    cy.intercept("/api/profile/*").as("profile");

  })
  it("Check if the Add Subgoal button exists as a staff of Community Based Program", () => {
    cy.loginComm();
    cy.contains("2024").click();
    cy.wait("@overview");

    // cy.get("a");
    cy.get("hr").eq(1).next().next().children().first().click();
    cy.contains("edit").click();
    cy.wait("@profile");

    cy.get("button").contains("Subgoal").should("exist");
  });

  it("Check if the Add Subgoal button exists as a staff of Home Center", () => {
    cy.loginHome();
    cy.contains("2024").click();
    cy.wait("@overview");

    cy.get("hr").eq(1).next().next().children().first().click();

    cy.contains("edit").click();
    cy.wait("@profile");

    cy.get("button").contains("Subgoal").should("exist");
  });

  it("Check for empty subgoals as a staff of Community Based Program", () => {
    cy.loginComm();
    cy.contains("2024").click();
    cy.wait("@overview");

    cy.get("hr").eq(1).next().next().children().first().click();
    cy.wait("@profile");

    cy.get("h2").contains("Subgoals").next().get("p").should("contain", "No subgoals");
  });

  it("Check for empty subgoals as a staff of Home Center", () => {
    cy.loginHome();
    cy.contains("2024").click();
    cy.wait("@overview");

    cy.get("hr").eq(1).next().next().children().first().click();
    cy.wait("@profile");

    cy.get("h2").contains("Subgoals").next().get("p").should("contain", "No subgoals");
  });

  it("Check for the created subgoals after adding the subgoals as a staff of Community Based Members.", () => {
    cy.loginComm();
    cy.contains("2024").click();
    cy.wait("@overview");

    cy.get("hr").eq(1).next().next().children().first().click();
    cy.contains("edit").click();
    cy.wait("@profile");

    cy.get("button").contains("Subgoal").click();

    cy.get("[placeholder='Enter new subgoal']").type("Subgoal 1");
    cy.get("button").contains("Save").click();

    cy.get("span").contains("save").parent().click();
    cy.get("h2").contains("Subgoals").next().get("li").should("contain", "Subgoal 1");
  });

  it("Check for the created subgoals after adding the subgoals as a staff of Home Care.", () => {
    cy.loginHome();
    cy.contains("2024").click();
    cy.wait("@overview");

    cy.get("hr").eq(1).next().next().children().first().click();
    cy.contains("edit").click();
    cy.wait("@profile");

    cy.get("button").contains("Subgoal").click();

    cy.get("[placeholder='Enter new subgoal']").type("Subgoal 1");
    cy.get("button").contains("Save").click();

    cy.get("span").contains("save").parent().click();
    cy.get("h2").contains("Subgoals").next().get("li").should("contain", "Subgoal 1");
  });

  it("Sign in as the admin user, and check for the subgoals the staffs from each program have made.", () => {
    cy.loginSuper();

    cy.contains("Community").click();
    cy.clickFirstChild();
    cy.get("h2").contains("Subgoals").next().children().first().should("not.contain", "No subgoals");
    cy.get("h2").contains("Subgoals").next().children().first().should("contain", "Subgoal 1");
    cy.visit('/overview');

    cy.contains("Home Care").click();
    cy.clickFirstChild();
    cy.get("h2").contains("Subgoals").next().children().first().should("not.be", "p");
    cy.get("h2").contains("Subgoals").next().children().first().should("contain", "Subgoal 1");
  });

});
