describe('Register', () => {
  it('open register page and put it test data', () => {
    cy.visit('/#/register')

    // Input fields
    cy.get('input[name=firstname]').type('TestFirstname')
    cy.get('input[name=lastname]').type('TestLastname')
    cy.get('input[name=mail]').type('mail44@test.com')
    cy.get('input[name=phone]').type('44')
    cy.get('input[name=password]').type('TestPassword')
    cy.get('input[name=passwordRepeat]').type('TestPassword{enter}')

    cy.get('#register').click()
  })
})
