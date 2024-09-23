describe('--- UPLOAD FILE ---', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/');

        const loginButton = cy.get('[data-cy="login-button"]');
        loginButton.click();
    });

    describe('when printing file list', () => {
        const filename = 'new-file.png';
        const file = `cypress/assets/${filename}`;

        it('should show a file list after upload a new file', () => {
            const fileInput = cy.get('[data-cy="input-file"]');
            fileInput.selectFile(file, { force: true }).then(() => {
                const confirmUploadButton = cy.get('[data-cy="confirm-upload-button"]');
                confirmUploadButton.click();

                const fileListComponent = cy.get('[data-cy="file-list"]');
                fileListComponent.should('be.visible');
                fileListComponent.should('contains.text', filename);
            });
        });
    });
});
