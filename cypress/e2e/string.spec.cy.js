import { DELAY_IN_MS } from "../../src/constants/delays";
import { cypressButtonAdd, cypressCircle, cypressForm, cypressInput, cypressVisual, cypressChangingColor, cypressModifiedColor, cypressDefaultColor } from "../constants";

describe('Работа строки', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Кнопка должна быть отключена, если инпут пуст', () => {
    cy.get(cypressForm).within(() => {
      cy.get(cypressInput).should('be.empty');
      cy.get(cypressButtonAdd).should('be.disabled');
    });
  });

  it('Проверка корректности разворачивания строки', () => {
    const inputText = 'hello';

    cy.get(cypressForm).within(() => {
      cy.get(cypressInput).type(inputText);
      cy.get(cypressButtonAdd).should('not.be.disabled');
      cy.get(cypressButtonAdd).click();
      cy.get(cypressButtonAdd).should('be.disabled');
    });
    cy.get(cypressVisual).within(() => {
      cy.clock();
      cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor).and('contain.text', 'h');
      cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressDefaultColor).and('contain.text', 'e');;
      cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressDefaultColor).and('contain.text', 'l');;
      cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('contain.text', 'l');;
      cy.get(cypressCircle).eq(4).should('have.css', 'border', cypressChangingColor).and('contain.text', 'o');;
      cy.tick(DELAY_IN_MS);
      cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'o');
      cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressChangingColor).and('contain.text', 'e');
      cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressDefaultColor).and('contain.text', 'l');
      cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressChangingColor).and('contain.text', 'l');
      cy.get(cypressCircle).eq(4).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'h');
      cy.tick(DELAY_IN_MS);
      cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'o');
      cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'l');
      cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'l');
      cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'e');
      cy.get(cypressCircle).eq(4).should('have.css', 'border', cypressModifiedColor).and('contain.text', 'h');
    });
  });
});