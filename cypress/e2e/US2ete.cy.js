describe('User story 1: To be able to have a PDF version of the childs profile saved in our device for easier accessibility. ', () => {
    beforeEach(() => {
        cy.visit('/');
        // enter credentials
        cy.contains('label', 'Username').parent().find('input').type('super');
        cy.contains('label', 'Password').parent().find('input').type('super');
        cy.contains('button','Login').click();

    });

    it('test case 1: admin user can change the background photo of the login page when .jpg file is uploaded',()=>{
        cy.get('a[href="/admin"]').click();
        cy.url().should('include', '/admin');
        
        cy.get('button').contains('Change Login Background').click();
        cy.get('.fixed').should('be.visible').wait(500);
        cy.get('input[type="file"]').should('be.visible');

        cy.fixture('sample.jpg', 'base64').then((fileContent) => {
            cy.get('input[type="file"]').attachFile({
              fileContent: fileContent,
              fileName: 'sample.jpg',
              mimeType: 'image/jpeg',
            });
        });

        cy.get('.flex.justify-end.space-x-4.mt-5').should('be.visible').find('button').contains('Confirm').click();
     
        cy.on('window:alert', (alertText) => {
            // Step 3: Assert the alert message is the expected success message
            expect(alertText).to.eq('Background image updated successfully!');}
        );
    });

    it('test case 2: admin user cannot change the background photo of the login page when if uploaded file is not .jpg format',()=>{
        cy.get('a[href="/admin"]').click();
        cy.url().should('include', '/admin');
        
        cy.get('button').contains('Change Login Background').click();
        cy.get('.fixed').should('be.visible').wait(500);
        cy.get('input[type="file"]').should('be.visible');

        cy.fixture('sample.jpg', 'base64').then((fileContent) => {
            cy.get('input[type="file"]').attachFile({
              fileContent: fileContent,
              fileName: 'sample2.jpg',
              mimeType: 'image/png',
            });
        });

        cy.get('.flex.justify-end.space-x-4.mt-5').should('be.visible').find('button').contains('Confirm').click();
     
        //error text should be shown
        cy.get('p.text-red-500').should('be.visible').and('have.text', 'Please select a .jpg file.');
    });


    it('test case 3: admin user cannot change the background photo of the login page when no file is uploaded',()=>{
    
        //click the adminControl
        cy.get('a[href="/admin"]').click();
        cy.url().should('include', '/admin');
    
        //click change login background
        cy.get('button').contains('Change Login Background').click();
        cy.get('.fixed').should('be.visible').wait(500);
        cy.get('input[type="file"]').should('be.visible').wait(500) // Optional: Wait if necessary
        .then(() => {
    
        // Find and click the Confirm button within the modal
        cy.get('.flex.justify-end.space-x-4.mt-5')
          .should('be.visible') // ensure the modal is visible
          .find('button')
          .contains('Confirm') // find Confirm button
          .click({ force: true }); // Click it
        });
    
        //error text should be shown
        cy.get('p.text-red-500').should('be.visible').and('have.text', 'Please select a .jpg file.');
      });

      it('test case 4: login with an Admin Account and the button for changing the background is there', () => {
        //click the adminControl
        cy.get('a[href="/admin"]').click();
        cy.url().should('include', '/admin');
    
        //check if the button is there, if its clickable and if it opens up the attatch file modal
        cy.contains('button', 'Change Login Background').click();
        cy.get('.fixed.inset-0.z-50').should('be.visible');
      });
  });
  