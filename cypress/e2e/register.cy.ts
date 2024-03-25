import { showError, showNotification } from "../utils";

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("successfully registers a new user", () => {
    cy.get("input[name=email]").type("michael.lawson@reqres.in");
    cy.get("input[name=password]").type("ValidPassword123!");
    cy.get("input[name=confirmPassword]").type("ValidPassword123!");
    cy.get("form").submit();
    cy.url().should("include", "/dashboard");
    showNotification("Register successful");
  });

  it("shows a mismatch password error", () => {
    cy.get("input[name=email]").type("new.user@example.com");
    cy.get("input[name=password]").type("ValidPassword123!");
    cy.get("input[name=confirmPassword]").type("AnotherPassword123!");
    cy.get("form").submit();
    showError("confirmPassword", "Passwords don't match");
  });

  it("validates empty form", () => {
    cy.get("form").submit();

    showError("email");
    showError("password");
    showError("confirmPassword");
  });
});

describe("Page Navigation", () => {
  it("navigates to the Login page from the Register page", () => {
    // Start at the Register page
    cy.visit("/register");

    // Click the navigation link that takes you to the Login page
    cy.get(".navigator-link").click();

    // Assert that the URL is now the Login page
    cy.url().should("include", "/login");
  });
});
