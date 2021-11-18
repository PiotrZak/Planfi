describe('Visit Page', () => {
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

  it('Login In Trainer Account', () => {
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .sc-gsTCUz > .sc-gKsewC').type(
      'jmeachem0@eventbrite.com'
    )
    cy.get(':nth-child(2) > .sc-gsTCUz > .sc-gKsewC').type('Jacklyn')
    cy.get('.sc-dQppl').click()
    cy.saveLocalStorage()
    cy.wait(1500)
  })

  it('Delete Added Plan', () => {
    cy.get('[href="/plans"] > .sc-jmhFOf > .sc-bdfBwQ').click()
    cy.get('.sc-kLgntA').click()
    cy.get('.sc-fbkhIv > :nth-child(2)').click();
    cy.get('.sc-bkzZxe').should('be.visible');
    cy.wait(1500)
  })

  it('Add Plan', () => {
    cy.get('.sc-ehSCib').click()
    cy.get('.sc-iBPRYJ').type('New Plan')
    cy.get('.sc-dQppl').click()
    cy.get('body > :nth-child(9)').should('be.visible')
    cy.wait(1500)
  })

  it('Assign exercise to plan', () => {
    cy.get('.sc-AzgDb').click()
    cy.get('.sc-ehSCib').click()
    cy.get('.bottom-sheet > :nth-child(6)').click()
  })

})
