import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { cypressButtonAdd, cypressButtonClear, cypressButtonRemove, cypressChangingColor, cypressCircle, cypressDefaultColor, cypressForm, cypressInput, cypressVisual } from "../constants";

describe('Работа очереди', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue');
    })
    function addFirstItem(item) {
      cy.get(cypressForm).within(() => {
          cy.get(cypressInput).type(item)
          cy.get(cypressButtonAdd).should('not.be.disabled');
          cy.get(cypressButtonRemove).should('be.disabled');
          cy.get(cypressButtonClear).should('be.disabled');
          cy.tick(SHORT_DELAY_IN_MS);
          cy.get(cypressButtonAdd).click();
      })
  }
  function addItem(item) {
    cy.get(cypressForm).within(() => {
        cy.get(cypressInput).type(item)
        cy.get(cypressButtonAdd).should('not.be.disabled');
        cy.get(cypressButtonRemove).should('not.be.disabled');
        cy.get(cypressButtonClear).should('not.be.disabled');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressButtonAdd).click();
    })
}
    it('Кнопки должны быть отключены, если инпут пуст', () => {

        cy.get(cypressForm).within(() => {
          cy.get(cypressInput).should('be.empty');
          cy.get(cypressButtonAdd).should('be.disabled');
          cy.get(cypressButtonRemove).should('be.disabled');
          cy.get(cypressButtonClear).should('be.disabled');
        });
      });
      it('Проверка корректности добавления в очередь', () => {
        cy.clock();
        addFirstItem(112);
        cy.get(cypressVisual).within(() => {
          cy.get(cypressCircle).eq(0).should('have.text', '112').and('have.css', 'border', cypressChangingColor)
          cy.tick(SHORT_DELAY_IN_MS)
          cy.get(cypressCircle).eq(0).should('have.text', '112').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('head').siblings('div').contains('tail')
        })

        addItem(11);
         cy.get(cypressVisual).within(() => {
          cy.get(cypressCircle).eq(1).should('have.text', '11').and('have.css', 'border', cypressChangingColor)
          cy.tick(SHORT_DELAY_IN_MS)
          cy.get(cypressCircle).eq(1).should('have.text', '11').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('tail')
          cy.get(cypressCircle).eq(1).siblings('div').should('not.contain', 'head');
          cy.get(cypressCircle).eq(0).siblings('div').should('not.contain', 'tail');
        })

        addItem(3);
        cy.get(cypressVisual).within(() => {
          cy.get(cypressCircle).eq(2).should('have.text', '3').and('have.css', 'border', cypressChangingColor)
          cy.tick(SHORT_DELAY_IN_MS)
          cy.get(cypressCircle).eq(2).should('have.text', '3').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('tail')
          cy.get(cypressCircle).eq(1).siblings('div').should('not.contain', 'tail');
          cy.get(cypressCircle).eq(0).siblings('div').should('not.contain', 'tail');
        })
      })
      it('Проверка корректности удаления из очереди', () => {
        cy.clock()
        addFirstItem(111);
        cy.tick(SHORT_DELAY_IN_MS)
        addItem(10);
        cy.tick(SHORT_DELAY_IN_MS)
        addItem(12);
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(cypressForm).within(() => {
          cy.get(cypressInput).should('be.empty');
          cy.get(cypressButtonAdd).should('be.disabled');
          cy.get(cypressButtonClear).should('not.be.disabled');
          cy.get(cypressButtonRemove).should('not.be.disabled').click();
      })
      cy.get(cypressVisual).within(() => {
        cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressCircle).first().should('not.have.text', '111').siblings('div').should('not.contain', 'head');;
        cy.get(cypressCircle).eq(1).should('have.text', '10').siblings('div').should('contain', 'head');
      })
      addItem(111);
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(cypressVisual).within(() => {
        cy.get(cypressCircle).eq(3).should('have.text', '111').siblings('div').should('contain', 'tail')
      })
      })
      it('Проверка корректности очистки стэка', () => {
        cy.clock();
        addFirstItem(111);
        cy.tick(SHORT_DELAY_IN_MS)
        addItem(10);
        cy.tick(SHORT_DELAY_IN_MS)
        addItem(12);
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).should('be.empty');
            cy.get(cypressButtonAdd).should('be.disabled');
            cy.get(cypressButtonRemove).should('not.be.disabled')
            cy.get(cypressButtonClear).should('not.be.disabled').click();
        })
        cy.get(cypressVisual).within(() => {
          cy.get(cypressCircle).children().next().should('have.length', 0);
        })
        cy.get(cypressForm).within(() => {
          cy.get(cypressInput).should('be.empty');
          cy.get(cypressButtonAdd).should('be.disabled');
          cy.get(cypressButtonRemove).should('be.disabled');
          cy.get(cypressButtonClear).should('be.disabled');
        })
      })
})