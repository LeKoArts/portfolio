describe('Contact', () => {
  it('E-Mail Button has right link', () => {
    cy.visit('/kontakt')
      .getByText('E-Mail')
      .should('have.prop', 'href', 'mailto:hello@lekoarts.de')
  })
})
