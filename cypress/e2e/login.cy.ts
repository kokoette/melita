describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should disable the submit button if the form is invalid', () => {

    //Disable submit button if form fields are empty
    cy.get('input[type=email]').clear()
    cy.get('input[type=password]').clear()

    cy.get('button[type=submit]').should('be.disabled')


    // Disable submit button if form is invalid
    cy.get('input[type=email]').type('james@gmail') // Invalid email
    cy.get('input[type=password]').type('jwlkf')

    cy.get('button[type=submit]').should('be.disabled')

    // Enable submit button if form is valid
    cy.get('input[type=email]').clear().type('james@gmail.com') //valid email
    cy.get('input[type=password]').clear().type('1234566')

    cy.get('button[type=submit]').should('not.be.disabled')

  });


  it('should call API when form is submitted', () => {

    cy.intercept('POST', 'http://localhost:9999/login', {
      delay:5000,
      body: {
        authToken:'dummyToken'
      }
    }).as('loginRequest')

    cy.intercept('POST', 'http://localhost:9999/login', {
      statusCode:200,
      body: {
        authToken:'dummyToken'
      }
    }).as('loginRequestSuccess')

    cy.get('input[type=email]').clear().type('james@gmail.com') //valid email
    cy.get('input[type=password]').clear().type('1234566')

    cy.get('button[type=submit]').click()

    cy.get('mat-spinner').should('be.visible')

    cy.wait('@loginRequestSuccess')

    cy.get('mat-spinner').should('not.exist')

    // test if token is saved to localstorage
    cy.window().then((win:Window) => {
      expect( win.localStorage.getItem('token')).to.equal('dummyToken')
    })

  })


  it('should validate incorrect email format', () => {
    // Enter invalid email
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="email"]').focus().blur();

    // Check for email validation error message
    cy.contains('Please enter a valid email address').should('be.visible');
  });

  it('should displays password length validation', () => {
    // Enter a valid email
    cy.get('input[placeholder="Username"]').type('james@example.com');

    // Enter a password that's too short, not valid
    cy.get('input[placeholder="Password"]').type('123');

    // Check for password length validation error
    cy.contains('Password must be at least 6 characters long').should('be.visible');
  });

  it('successfully logs in with correct credentials', () => {
    // Enter a valid email
    cy.get('input[placeholder="Username"]').type('james@example.com');

    // Enter a valid password
    cy.get('input[placeholder="Password"]').type('validpassword');

    // Click the login button
    cy.get('button[type="submit"]').click();


    cy.url().should('include', '/home');
  });

  it('should toggle password visibility', () => {

    // Enter a password and click the visibility toggle button
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button[aria-label="Hide password"]').click();

    // Check that the input type changes to text (revealing the password)
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');

    // Click the toggle again to hide the password
    cy.get('button[aria-label="Hide password"]').click();

    // Check that the input type changes back to password
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
  });
});
