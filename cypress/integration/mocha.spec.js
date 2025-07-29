/// <reference types="cypress" />

function typeFormattedDate(selector, inputDate) {
  const cleanedDate = inputDate.replace(/-/g, '/');
  const [month, day, year] = cleanedDate.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  cy.get(selector).type(formattedDate);
}

describe('commitquality Test Suite', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  before(() => {
    cy.visit('https://commitquality.com/', { timeout: 10000 });
  });

  after(() => {

    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should login with valid data and add new product', () => {
cy.get('a[data-testid="navbar-login"]', { timeout: 10000 }).click();
    cy.get('input[data-testid="username-textbox"]', { timeout: 10000 }).type('test');
    cy.get('input[data-testid="password-textbox"]', { timeout: 10000 }).type('test');
    cy.get('button[data-testid="login-button"]', { timeout: 10000 }).click();

    cy.get('a[data-testid="navbar-logout"]', { timeout: 10000 }).should('have.text', 'Logout');

  });
  it('verify add new product', () => {

    
let productName='mohannad new product';
    cy.get('a[data-testid="add-a-product-button"]', { timeout: 10000 }).click();
    cy.get('input[data-testid="product-textbox"]', { timeout: 10000 }).type(productName);
    cy.get('input[data-testid="price-textbox"]', { timeout: 10000 }).type('500');
    typeFormattedDate('input[data-testid="date-stocked"]', '09/25/2025');

    cy.get('button[data-testid="submit-form"]', { timeout: 10000 }).click();

    cy.get('input[class="filter-textbox"]', { timeout: 10000 }).type(productName);
    cy.get('button[data-testid="filter-button"]', { timeout: 10000 }).click();
cy.get('td[data-testid="name"]', { timeout: 10000 }).should('have.text',productName);


  });
it('verify reset functionality working correctly', () => {
 cy.get('input[class="filter-textbox"]')
  



});
  it('should edit with price', () => {
  let price = 200;
  let productName = 'mohannad new product';

  cy.get('a[data-testid="edit-button"]', { timeout: 10000 }).click();
  cy.get('input[data-testid="price-textbox"]', { timeout: 10000 }).clear().type(price.toString());
  cy.get('button[data-testid="submit-form"]', { timeout: 10000 }).click();

  cy.get('input[class="filter-textbox"]', { timeout: 10000 }).clear().type(productName);
  cy.get('button[data-testid="filter-button"]', { timeout: 10000 }).click();
  cy.get('td[data-testid="price"]').should('have.text', price.toString());
  



});
it('verify delete product',function(){
     cy.get('a[data-testid="delete-button"]').click();

     cy.get('p[class="add-product-message"]').invoke('text').should('equal','No products found')


});
});

