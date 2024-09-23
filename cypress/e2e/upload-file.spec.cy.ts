describe('--- UPLOAD FILE ---', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/');

        const loginButton = cy.get('[data-cy="login-button"]');
        loginButton.click();
    });

    describe('when uploading a new file', () => {
        const file = 'cypress/assets/new-file.png';
        
        it('should upload a new file successfully', () => {
            const fileInput = cy.get('[data-cy="input-file"]');
            fileInput.selectFile(file, { force: true }).then(() => {
                const confirmUploadButton = cy.get('[data-cy="confirm-upload-button"]');
                confirmUploadButton.should('be.visible');

                confirmUploadButton.click();

                const uploadButton = cy.get('[data-cy="upload-button"]');
                uploadButton.should('be.visible');
            });
        });
    });
});
