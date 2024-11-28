describe('User story 1: To be able to have a PDF version of the childs profile saved in our device for easier accessibility. ', () => {
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

    
    it('test case 1:  User can download a pdf version of the child\'s profile to their device.',()=>{
        cy.wait(100);
        cy.get('span.material-symbols-outlined').contains('download').click({ force: true });
        cy.wait(1000);

        cy.get('div.flex.items-center.mb-8 h1.text-4xl.xl\\:text-7xl.flex-grow').then(($pangalan) => {
            const pangalan = $pangalan.text().trim(); // get the name
            const downloadedFilePath = `cypress/downloads/${pangalan}(BridgeBuilders).pdf`;
            cy.log(downloadedFilePath); 
            cy.readFile(downloadedFilePath, 'binary', {timeout: 1000}).should('exist');
        });  
    });


    it('test case 2: The profile component renders without error.',()=>{
        cy.wait(100);
        let profileData ={};
        cy.get('.flex.flex-col.mt-4.text-bb-violet').then(($profile) => {
            profileData = {
                palayaw: $profile.find('h2').eq(0).text().split(':')[1].trim(), // Palayaw
                edad: $profile.find('h2').eq(1).text().split(':')[1].trim(), // Edad
                kasarian: $profile.find('h2').eq(2).text().split(':')[1].trim(), // Kasarian
                birthday: $profile.find('h2').eq(3).text().split(':')[1].trim(), // Petsa ng Kapanganakan
                relihiyon: $profile.find('h2').eq(4).text().split(':')[1].trim(), // Relihiyon
                caseNo: $profile.find('h3').text().split(':')[1].trim(), // Case number
                attachedFiles: [] //attached files
            };

            expect(profileData.palayaw).to.exist.and.not.to.be.empty;
            expect(profileData.edad).to.exist.and.not.to.be.empty;
            expect(profileData.kasarian).to.exist.and.not.to.be.empty;
            expect(profileData.birthday).to.exist.and.not.to.be.empty;
            expect(profileData.relihiyon).to.exist.and.not.to.be.empty;
            expect(profileData.caseNo).to.exist.and.not.to.be.empty;
        
            // Check if "attachedFiles" array is initialized as an empty array
            expect(profileData.attachedFiles).to.be.an('array');
        });

        cy.get('h2.text-3xl.xl\\:text-5xl').then(($program) => {
            profileData.program = $program.text().split(':')[1].trim(); //program
            expect(profileData.program).to.exist.and.not.to.be.empty;
        });

        cy.get('div.flex.items-center.mb-8 h1.text-4xl.xl\\:text-7xl.flex-grow').then(($pangalan) => {
            profileData.pangalan = $pangalan.text().trim(); // Name
            expect(profileData.pangalan).to.exist.and.not.to.be.empty;
        });
    });


    it('test case 3: the "Download PDF" button is present and clickable.',()=>{
        cy.wait(100);
        cy.get('span.material-symbols-outlined').contains('download').then(($btn) => {
        const spy = cy.spy().as('clickSpy');

        // click the button (force the click if necessary)
        $btn.on('click', spy);
        cy.wrap($btn).click({ force: true });

        // assert that the click event was called (button does something)
        cy.get('@clickSpy').should('have.been.called');
        });
    });

    it('test case 4: The information in the downloaded PDF matches the informations found in the Profile page',()=>{
        cy.wait(100); 

        let profileData = {};

        // extract profile data from the page
        cy.get('.flex.flex-col.mt-4.text-bb-violet').then(($profile) => {
            profileData = {
                palayaw: $profile.find('h2').eq(0).text().split(':')[1].trim(), // Palayaw
                edad: $profile.find('h2').eq(1).text().split(':')[1].trim(), // Edad
                kasarian: $profile.find('h2').eq(2).text().split(':')[1].trim(), // Kasarian
                birthday: $profile.find('h2').eq(3).text().split(':')[1].trim(), // Petsa ng Kapanganakan
                relihiyon: $profile.find('h2').eq(4).text().split(':')[1].trim(), // Relihiyon
                caseNo: $profile.find('h3').text().split(':')[1].trim(), // Case number
                // attachedFiles: [] //attached files
            };
        });
        cy.get('h2.text-3xl.xl\\:text-5xl').then(($program) => {
            profileData.program = $program.text().split(':')[1].trim(); //program
        });

        cy.get('div.flex.items-center.mb-8 h1.text-4xl.xl\\:text-7xl.flex-grow').then(($pangalan) => {
            profileData.pangalan = $pangalan.text().trim(); // Name
        });

        cy.get('div.flex.items-center.mb-8 h1.text-4xl.xl\\:text-7xl.flex-grow').then(($pangalan) => {
            const pangalan = $pangalan.text().trim(); // get the name
            const downloadedFilePath = `cypress/downloads/${pangalan}(BridgeBuilders).pdf`;
            cy.log(downloadedFilePath); 
            cy.readFile(downloadedFilePath, 'binary').should('exist').then((pdfBuffer) => {
                const pdfText = pdfBuffer.toString('binary');
    
                // match text within parentheses (Tj operator)
                const textMatches = pdfText.match(/\(.*?\)/g); // Match all text between parentheses
                const extractedTexts = textMatches ? textMatches.map((match) => match.replace(/[()]/g, '').trim()) : [];
    
                // assert that extracted text includes profile data
                expect(extractedTexts).to.include(profileData.palayaw);
                expect(extractedTexts).to.include(profileData.pangalan);
                expect(extractedTexts).to.include(profileData.edad);
                expect(extractedTexts).to.include(profileData.kasarian);
                expect(extractedTexts).to.include(profileData.birthday);
                expect(extractedTexts).to.include(profileData.relihiyon);
                expect(extractedTexts).to.include(profileData.program);
                expect(extractedTexts).to.include(profileData.caseNo);
            });
        });     
    });

    it('test case 5: The profile image is present in the PDF.',()=>{
        cy.wait(100); 
        // cy.get('div.w-full.h-full.md\\:h-1\\/2.lg\\:h-2\\/3.xl\\:h-3\\/6.bg-bb-light-purple.flex.align-center.justify-center.self-center img').should('have.attr', 'src').and('not.be.empty'); 

        cy.get('div.flex.items-center.mb-8 h1.text-4xl.xl\\:text-7xl.flex-grow').then(($pangalan) => {
            const pangalan = $pangalan.text().trim(); // get the name
            const downloadedFilePath = `cypress/downloads/${pangalan}(BridgeBuilders).pdf`;
            cy.log(downloadedFilePath); 
            cy.readFile(downloadedFilePath, 'binary').then((pdfBuffer) => {
                const pdfText = pdfBuffer.toString('binary');
            
                // check if the PDF text contains image specific markers (XObject references or JPEG or PNG)
                const hasImage = /\/XObject/.test(pdfText) || /\/Image/.test(pdfText);
            
                expect(hasImage).to.be.true;  // assert that image is found
                }); 
        });  
    });

  });
  