import { login, showNotification } from "../utils";

describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    login();
  });

  it("updates a user", () => {
    cy.get(".edit-user").first().click();
    cy.get("input[name=first_name]").clear().type("UpdatedName");
    cy.get("form").submit();
    showNotification("User updated successfully");
    cy.get(".data-table-body").first().should("contain", "UpdatedName");
  });

  it("creates a new user", () => {
    cy.get(".create-user").click();
    cy.get("input[name=email]").type("new.user@example.com");
    cy.get("input[name=first_name]").type("New");
    cy.get("input[name=last_name]").type("User");
    cy.get("form").submit();
    showNotification("User created successfully");
    cy.get(".data-table-body")
      .first()
      .should("contain", "new.user@example.com");
  });

  it("deletes a user", () => {
    cy.get(".delete-user").first().click();
    cy.get(".confirm-delete").click();
    showNotification("User deleted successfully");
  });

  it("logout a user", () => {
    cy.get(".logout").click();
    showNotification("Logout successful");
  });
});
