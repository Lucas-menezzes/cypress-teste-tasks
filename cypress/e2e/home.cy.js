describe('home', () => {
  it('passes', () => {
    cy.visit('/')
    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})
