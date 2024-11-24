// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.session(username, () => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);

    cy.visit("/api/login", {
      body: {
        username: username,
        password: password
      }
    });

    cy.intercept("/post/")

    cy.contains("Welcome").should("contain", username);
  });
});

Cypress.Commands.add("loginAdmin", (username, password) => {
  cy.session(username, () => {
    cy.get("#username").type(username);
    cy.get("#password").type(password);

    cy.intercept("/api/signup", {
      body: {
        username: username,
        password: password,
        userType: 'superUser'
      }
    }).as('loginAdmin');

    cy.wait('loginAdmin');


    cy.contains("Welcome").should("contain", username);
  });
});

Cypress.Commands.add("logout", () => {
  cy.get('a[href="/logout"]').click();
});
