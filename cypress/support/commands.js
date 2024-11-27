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

const {log} = require("console");

Cypress.Commands.add("fillUpSignIn", (username, password) => {
  cy.get('[placeholder="Username"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.get("button").contains("Login").click();
})

Cypress.Commands.add("loginHome", () => {
  cy.intercept('post', '/api/login', (req) => {
    if (req.body.username === 'home' && req.body.password === 'home') {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            token: 'mocked-jwt-token',  // mock jwt token
            username: 'home',
            userType: 'homeCare',
          },
        },
      });
    } else {
      req.reply({
        statusCode: 401,
        body: { message: 'unauthorized' },
      });
    }
  }).as('loginHome');

  cy.intercept('get', '/api/current-user', {
    statuscode: 200,
    body: {
      username: 'home',
      userType: 'homeCare',
    },
  }).as('getCurrentUserHome');

  cy.visit("/");
  cy.fillUpSignIn("home", "home");


  cy.wait("@loginHome");
  cy.wait("@getCurrentUserHome");

  // Store the token to simmulate current session
  sessionStorage.setItem('token', 'mocked-jwt-token');
  sessionStorage.setItem('fromLogin', 'true');

  cy.url().should("include", "/overview");
});

Cypress.Commands.add("loginComm", () => {
  cy.session("comm", () => {
    cy.get('[placeholder="Username"]').type("comm");
    cy.get('[placeholder="Password"]').type("comm");
    cy.intercept("/api/login", (req) => {
      req.reply({
        username: "comm",
        password: "comm",
        userType: "community",
      });
    });

    cy.contains("Welcome").should("contain", "comm");
  }).as("loginComm");
});

Cypress.Commands.add("loginSuper", () => {

  cy.intercept('post', '/api/login', (req) => {
    if (req.body.username === 'super' && req.body.password === 'super') {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            token: 'mocked-jwt-token',  // mock jwt token
            username: 'super',
            userType: 'superUser',
          },
        },
      });
    } else {
      req.reply({
        statusCode: 401,
        body: { message: 'unauthorized' },
      });
    }
  }).as('loginSuper');

  cy.intercept('get', '/api/current-user', {
    statuscode: 200,
    body: {
      username: 'super',
      userType: 'superUser',
    },
  }).as('getCurrentSuperUser');

  cy.visit("/");
  cy.fillUpSignIn("super", "super");

  cy.wait("@loginSuper");
  cy.wait("@getCurrentSuperUser");

  // Store the token to simmulate current session
  sessionStorage.setItem('token', 'mocked-jwt-token');
  sessionStorage.setItem('fromLogin', 'true');
});

Cypress.Commands.add("logout", () => {
  cy.contains("logout").click();
});
