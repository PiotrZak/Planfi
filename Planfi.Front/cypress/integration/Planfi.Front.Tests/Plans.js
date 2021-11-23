const url = 'https://plan-fi.pl/'

describe('Test Network', () => {
  it('Test Network', () => {
    cy.visit(url, { timeout: 30000 })
  })
})

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
    cy.get('.sc-bBXqnf').click()

    cy.get('.sc-gKsewC').type('test@gmail.com')
    cy.get('.sc-dQppl').click()
    cy.wait(3500)
    cy.get('.sc-idOhPF').should('contain', 'Something gone wrong')
    cy.get('.sc-dIUggk > .sc-bdfBwQ').click()
    cy.get('.sc-idOhPF').should('not.exist')

    cy.wait(1500)

    cy.get('.sc-gKsewC').clear()
    cy.get('.sc-gKsewC').type('jmeachem0@eventbrite.com')
    cy.get('.sc-dQppl').click()
    cy.get('.sc-bkzZxe').should('contain', 'The message has been')
    cy.get('.sc-dIUggk > .sc-bdfBwQ').click()
    cy.get('.sc-idOhPF').should('not.exist')
    cy.url().should('eq', 'https://plan-fi.pl/login')
    cy.wait(2500)
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
    cy.get('.sc-dQppl').click()
    cy.saveLocalStorage()
    cy.wait(4000)
  })

  it('Add Plan', () => {
    cy.get('[href="/plans"]').click()
    cy.get('.sc-jeGSBP').click()
    cy.get('.sc-iBPRYJ').type('Plan Created By E2E Tests')
    cy.get('.sc-dQppl').click()
    cy.get('.sc-idOhPF').should('be.visible')
    cy.get('.sc-dIUggk > .sc-bdfBwQ').click()
    cy.wait(3500)
  })

  it('Update Plan', () => {

    const editedTitle = 'New Plan Updated';
    cy.get('.sc-jJEJSO').click({ multiple: true })
    cy.get('.sc-ehSCib > :nth-child(3)').click()
    cy.get('.sc-iBPRYJ').type(editedTitle)
    cy.get('.sc-dQppl').click()
    cy.get('.sc-dIUggk > .sc-bdfBwQ').click({ multiple: true })
    cy.get('.sc-hTZhsR').should(
      "have.text",
      editedTitle
    );
    
    cy.wait(3500)
  })

  it('Delete Added Plan', () => {
    cy.get('.sc-jJEJSO').click({multiple: true})
    cy.get('.sc-ehSCib > :nth-child(2)').click({ multiple: true })
    cy.get('.sc-bkzZxe').should('be.visible')
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
