//const url = 'https://plan-fi.pl/'
const url = "http://localhost:3000/login"

describe('Test Network', () => {
  it('Test Network', () => {
    cy.visit(url, { timeout: 30000 })
  })
})

describe('Plan Issues', () => {
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

  it('Login', () => {
    cy.visit(url)
    cy.get(':nth-child(1) > .sc-gsTCUz > .sc-gKsewC').type(
      'jmeachem0@eventbrite.com'
    )
    cy.get(':nth-child(2) > .sc-gsTCUz > .sc-gKsewC').type('Jacklyn')
    cy.get('#login').click()
    cy.saveLocalStorage()
    cy.wait(2000)
  })

  it('Add Plan', () => {
    cy.get('[href="/plans"]').click()
    cy.get('#add-plan').click()
    cy.get('#add-plan-input').type('Plan Created By E2E Tests')
    cy.wait(1500)
    cy.get('.sc-jeGSBP > #add-plan').click()
    cy.get('#notification').should('be.visible')
    cy.get('#remove-notification').click()
    cy.wait(3500)
  })

  it('Update Plan', () => {

    const editedTitle = 'New Plan Updated';
    cy.get('.sc-jJEJSO').click({ multiple: true })
    cy.get('.sc-ehSCib > :nth-child(3)').click()
    cy.get('.sc-iBPRYJ').type(editedTitle)
    cy.get('.sc-dQppl').click()
    cy.get('.sc-dIUggk > .sc-bdfBwQ').click({ multiple: true })
    cy.wait(2500)
    cy.get('.sc-hTZhsR').should(
      "have.text",
      editedTitle
    );
    
    cy.wait(3500)
  })

  it('Delete Added Plan', () => {
    cy.get('.sc-jJEJSO').click()
    cy.get('.sc-ehSCib > :nth-child(2)').click({ multiple: true })
    cy.get('#notification').should('be.visible')
    cy.wait(3500)
  })




  //   // todo - do that test after design is done
  //   //correlated with srie

  //   //   it('Assign exercise to plan', () => {
  //   //     cy.get('.sc-AzgDb').click()
  //   //     cy.get('.sc-ehSCib').click()
  //   //     cy.get('.bottom-sheet > :nth-child(6)').click()
  //   //   })
})
