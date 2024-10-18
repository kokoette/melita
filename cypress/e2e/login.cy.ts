describe('Login Page E2E Test', () => {
  beforeEach(() => {
    cy.visit('/auth');  // Navigates to the login page
  });

  it('should show "Email is required" when the email is empty', () => {
    // Initially, click submit without typing anything
    cy.get('button[type="submit"]').click();

    // Expect the "Email is required" message to be visible
    cy.contains('Email is required', { timeout: 8000 }).should('be.visible');
  });

  it('should show "Please enter a valid email address" for invalid email', () => {
    // Type an invalid email format
    cy.get('input[placeholder="Username"]').type('invalidemail');

    // Click another field to trigger the validation (blur event)
    cy.get('input[placeholder="Password"]').click();

    // Expect the "Please enter a valid email address" message to be visible
    cy.contains('Please enter a valid email address', { timeout: 8000 }).should('be.visible');
  });

  it('should submit the form when valid credentials are entered', () => {
    // Type a valid email
    cy.get('input[placeholder="Username"]').type('user@example.com');

    // Type a valid password
    cy.get('input[placeholder="Password"]').type('password123');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Check if the login request is made (use route interception or any other checks)
    cy.url().should('not.include', '/auth'); // Check if navigation occurs after login
  });
});
