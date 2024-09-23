describe('--- AUTHENTICATION ---', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  describe('when click in login button', () => {
    it('should show file-uploader and file-list components', () => {
      const accessDeniedMessage = cy.get('[data-cy="access-denied-message"]');
      accessDeniedMessage.should('be.visible');

      const loginButton = cy.get('[data-cy="login-button"]');
      loginButton.click();

      const fileUploader = cy.get('[data-cy="file-uploader"]');
      const fileList = cy.get('[data-cy="file-list"]');
      
      fileUploader.should('be.visible');
      fileList.should('be.visible');
    });
  });

  describe('when click in logout button', () => {
    beforeEach(() => {
      const loginButton = cy.get('[data-cy="login-button"]');
      loginButton.click();
    });

    it('should hide file-uploader and file-list components and show access denied message', () => {
      const logoutButton = cy.get('[data-cy="logout-button"]');
      logoutButton.click();

      const accessDeniedMessage = cy.get('[data-cy="access-denied-message"]');
      accessDeniedMessage.should('be.visible');
    });
  });

  describe('when a long period of inactivity', () => {
    beforeEach(() => {
      const loginButton = cy.get('[data-cy="login-button"]');
      loginButton.click();
    });

    it('should logout automatically', () => {
      cy.wait(300000);

      const loginButton = cy.get('[data-cy="login-button"]');
      loginButton.should('be.visible');
    });
  });
})