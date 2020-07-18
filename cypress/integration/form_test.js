describe('form test', () => {
    it('test that the form is working properly', () => {
        cy.visit('localhost:3000')

        cy.get('[for="name"] > input')
        .type('Tremain')
        .should('have.value', 'Tremain')

        const email = 'tremain@yahoo.com'
        cy.get('[for="email"] > input')
        .type(email)
        .should('have.value', email)

        const password = 'plantAtree365'
        cy.get('[for="password"] > input')
        .type(password)
        .should('have.value', password)

        cy.get('.terms > input')
        .click()
        .should('have.checked', true)
        
        cy.get('button#submit')
        .should('not.be.disabled')
    })
    it('error messages are displayed properly', () => {
        cy.get ('[for="email"] > input')
        .clear()

        cy.get('[data-cy="email-error-msg"]')
        .contains('Please provide an email.')
    })
})