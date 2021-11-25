const url = 'https://plan-fi.pl/'
// const url = 'localhost:3000/login'
// const url2 = 'http://localhost:3000/'
const longTitle = 'SpB8rhVtJlnNpXEdTy41STMPA'
const shortTitle = 'Diamond Pomps'
const anotherTitle = 'Death Lift'

describe('Exercise Issues', () => {
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
    cy.get('.sc-kstrdz').click()
    cy.saveLocalStorage()
    cy.wait(4000)
  })

  it('Add Exercise', () => {
    cy.get('[href="/categories"]').click()
    cy.get('.sc-cOajty').click()
    cy.url().should('eq', `${url2}add-exercise`)
    cy.wait(1000)
    cy.get('.sc-kstrdz').click()
    cy.wait(1000)
    cy.get('.sc-kLgntA').should('have.text', 'Exercise name is required')
    cy.get('.sc-iBPRYJ').type(longTitle)
    cy.get('.sc-kstrdz').click()
    cy.wait(1000)
    cy.get('.sc-kLgntA').should(
      'have.text',
      'This field cannot contain more than 24 characters!'
    )

    cy.get('.MuiSwitch-input').click()
    cy.get('.sc-iBPRYJ').clear()
    cy.get('.sc-iBPRYJ').type(shortTitle)
    cy.wait(1000)

    cy.get('.sc-kstrdz').click()
    cy.get('.sc-bYEvPH').should('have.text', 'Sending to cloud')
    cy.url().should('eq', `${url}add-exercise`)
    cy.wait(3500)
    cy.get('.MuiSwitch-input').click()
    cy.get('.sc-iBPRYJ').type(anotherTitle)
    cy.get('.sc-kstrdz').click()
    cy.wait(3500)
    cy.url().should('eq', `${url}categories`)

  })
})
