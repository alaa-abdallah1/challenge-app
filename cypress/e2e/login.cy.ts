import { login, showError, showNotification } from "../utils";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("successfully logs in", () => {
    login();
    showNotification("Login successful");
    cy.url().should("include", "/dashboard");
  });

  it("shows an error for invalid login", () => {
    cy.get("input[name=email]").type("user@example.com"); // Invalid email
    cy.get("input[name=password]").type("validPassword56!"); // valid password
    cy.get("form").submit();
    showNotification("ser not found");
  });

  it("validates empty form", () => {
    cy.get("form").submit();
    showError("email");
    showError("password");
  });
});

describe("Page Navigation", () => {
  it("navigates to the Register page from the Login page", () => {
    // Start at the Login page
    cy.visit("/login");

    // Click the navigation link that takes you to the Register page
    cy.get(".navigator-link").click();

    // Assert that the URL is now the Register page
    cy.url().should("include", "/register");
  });
});
