import { validEmail, validPassword } from "./values";

export const login = (email: string, password: string) => {
  cy.get("input[name=email]").type(email || validEmail);
  cy.get("input[name=password]").type(password || validPassword);
  cy.get("form").submit();
};
