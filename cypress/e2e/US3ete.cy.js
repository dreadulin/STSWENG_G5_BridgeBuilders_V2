describe('User story 3: To be able to attach and archive additional files on the childs profile page', () => {
    beforeEach(() => {
        cy.visit('/');
        // enter credentials
        cy.contains('label', 'Username').parent().find('input').type('super');
        cy.contains('label', 'Password').parent().find('input').type('super');
        cy.contains('button','Login').click();
        
        //navigate to year 2024
        cy.get('button').contains('2024').click();
        cy.get('div.space-y-4 a').first().click();
    });
  
    it('test case 1:should allow a user to attach a compatible file and display it in the profile', () => {
      // click import file button
      cy.contains('Import File').click();
  
      //upload the file testPdf.pdf (path in the fixtures)
      cy.get('input[type="file"]')
        .should('not.be.visible') 
        .selectFile({
          contents: Cypress.Buffer.from('Sample content of the file'),
          fileName: 'testPdf.pdf',
          mimeType: 'application/pdf',
        }, { force: true });
  
      // verify file is displayed in the profile after the upload (updated GET request)
        cy.contains('Attached Files').should('exist');
        cy.contains('testPdf.pdf').should('exist');
      
    });
  
    it('test case 2: user should be able to archive an attached file', () => {

        cy.on('window:confirm', (message) => {
            expect(message).to.eq('Are you sure you want to archive this file?');
            return true; // for confirmation after clicking of archive
          });
        //click archive button
        cy.contains('testPdf.pdf').parent().find('button').contains('Archive').click();
         
        cy.reload();
        cy.contains('testPdf.pdf').should('not.exist'); 
    });
  });
  