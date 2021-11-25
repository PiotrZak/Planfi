// //const url = 'https://plan-fi.pl/'
// const url = 'localhost:3000/login'
// const longTitle = "SpB8rhVtJlnNpXEdTy41STMPA"
// const shortTitle = "Diamond Pomps"


// describe('Exercise Issues', () => {
//     before(() => {
//       cy.clearLocalStorageSnapshot()
//     })
  
//     beforeEach(() => {
//       cy.viewport(1280, 720)
//       cy.restoreLocalStorage()
//     })
  
//     afterEach(() => {
//       cy.saveLocalStorage()
//     })
  
//     it('Login', () => {
//       cy.visit(url)
//       cy.get(':nth-child(1) > .sc-gsTCUz > .sc-gKsewC').type(
//         'jmeachem0@eventbrite.com'
//       )
//       cy.get(':nth-child(2) > .sc-gsTCUz > .sc-gKsewC').type('Jacklyn')
//       cy.get('.sc-dQppl').click()
//       cy.saveLocalStorage()
//       cy.wait(4000)
//     })
  
//     it('Add Exercise', () => {
//       cy.get('[href="/categories"]').click()
//       cy.get('.sc-jeGSBP').click()
//       cy.url().should('eq', 'https://plan-fi.pl/add-exercise')
//       cy.get('.sc-gKsewC').type(longTitle)

//       cy.get('.sc-dQppl').click()
//     })
  
// })