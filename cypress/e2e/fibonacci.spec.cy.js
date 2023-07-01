import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { cypressButtonAdd, cypressCircle, cypressForm, cypressInput, cypressVisual } from "../constants";

describe('Работа Фибоначчи', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/fibonacci');
    });
  
    it('Кнопка должна быть отключена, если инпут пуст', () => {
      cy.get(cypressForm).within(() => {
        cy.get(cypressInput).should('be.empty');
        cy.get(cypressButtonAdd).should('be.disabled');
      });
    });
  
    it('Проверка корректности работы Фибоначчи', () => {
      const inputText = "5";
  
      cy.get(cypressForm).within(() => {
        cy.get(cypressInput).type(inputText);
        cy.get(cypressButtonAdd).should('not.be.disabled');
        cy.get(cypressButtonAdd).click();
        cy.get(cypressButtonAdd).should('be.disabled');
        cy.get(cypressInput).should('be.empty');
      });
  
      cy.clock();
      cy.get(cypressVisual).within(() => {
        cy.get(cypressCircle).eq(0).should('have.text', '1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).eq(1).should('have.text', '1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).eq(2).should('have.text', '2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).eq(3).should('have.text', '3');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).eq(4).should('have.text', '5');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).eq(5).should('have.text', '8');
        cy.tick(SHORT_DELAY_IN_MS)
      });
    });
  });
  