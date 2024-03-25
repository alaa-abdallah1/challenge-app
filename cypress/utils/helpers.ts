export const showError = (name: string, message?: string) => {
  cy.get(`input[name=${name}]`).then(($input) => {
    cy.wrap($input)
      .closest("div")
      .next()
      .should("contain", message || "This field is required");
  });
};

export const showNotification = (message: string) => {
  cy.get(".notification").should("contain", message);
};
