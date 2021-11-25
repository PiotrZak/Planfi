//const url = 'https://plan-fi.pl/'
const url = "http://localhost:3000/login"


describe('Account Issues', () => {
    before(() => {
      cy.clearLocalStorageSnapshot()
    })
  
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.restoreLocalStorage()
    })
  
    afterEach(() => {
      cy.saveLocalStorage()
    })
  
    it('Forget Pasword with wrong email should display alert', () => {
      cy.visit(url)
      cy.get('#forget-password').click()
  
      cy.get('.sc-gKsewC').type('test@gmail.com')
      cy.get('#forget-password').click()
      cy.wait(3500)
      cy.get('#notification').should('contain', 'Something gone wrong')
      cy.get('#remove-notification').click()
      cy.get('#notification').should('not.exist')
  
      cy.wait(1500)
  
      cy.get('.sc-gKsewC').clear()
      cy.get('.sc-gKsewC').type('jmeachem0@eventbrite.com')
      cy.get('#forget-password').click()
      cy.get('#notification').should('contain', 'The message has been')
      cy.get('#remove-notification').click()
      cy.get('#notification').should('not.exist')
      cy.url().should('eq', 'https://plan-fi.pl/login')
      cy.wait(2500)
    })
  })