describe('Sandbox', () => {

    let sandbox;

    beforeEach(() => {

        cy.viewport(1280, 720);

        cy.fixture("data").then((data) => {
            sandbox = data.sandbox
        })
    })
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })


    it('Cash created', () => {
        cy.visit('/')
        cy.xpath("//button[contains(@class,'selfServiceContactSupport')]").click()
        cy.xpath("//input[@name='Subject']", {timeout:50000}).type(sandbox.subject)
        cy.xpath("//textarea[@name='Description']", {timeout:50000}).type(sandbox.description)
        cy.xpath("//input[@name='SuppliedEmail']", {timeout:50000}).type(sandbox.emailid)
        cy.xpath("//button[contains(@class,'contactSupportButton')]", {timeout:50000}).click()
        cy.xpath("//div[contains(@class,'forceCommunityContactSupportConfirmation')]/h1").should('have.text', sandbox.casecreated)


    })

    it('Search item', () => {
        cy.visit('/')
        cy.xpath("//div[@class='cSearchPublisher']",{timeout:50000}).type(sandbox.searchitem)
        cy.xpath("//div[@class='cSearchPublisher']",{timeout:50000}).click()
            .trigger('mouseover')
        cy.xpath("//div[@class='option-text slds-truncate']//span[@class='all suggestion suggestionText searchOption uiOutputText']", {timeout: 50000})
            .should('be.visible')
        cy.xpath("//div[@class='option-text slds-truncate']//span[@class='all suggestion suggestionText searchOption uiOutputText']", {timeout: 500000})
            .click()
        cy.xpath("//a[text()='Articles']", {timeout: 500000}).click()
        cy.xpath("//a[contains(@href,'Los-Angeles-Rams')]", {timeout: 500000}).click({force: true})
        cy.xpath("//div[@class='detail slds-text-align--center']", {timeout: 50000}).should("have.text", sandbox.popup)
        cy.xpath("//button[@title='Close this window']").should('be.visible').click()
        cy.xpath("//div[@class='article-column zoom slds-text-longform selfServiceArticleLayout']", {timeout: 50000})
            .should('be.visible')
        cy.xpath("//div[contains(@class,'slds-form-element')]/../../..//span[text()='Article Number']",{timeout:50000}).should('be.visible')
        cy.xpath("//div[contains(@class,'slds-form-element')]/../../..//span[text()='Article Number']/../..//div[@class='slds-form-element__control slds-grid itemBody']",{timeout:50000})
            .then(function ($number) {
                let ArticleNumber = $number.text()
                cy.log('my ArticleNumber is', ArticleNumber)
            })

    })
})

