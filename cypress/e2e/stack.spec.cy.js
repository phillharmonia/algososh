import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { cypressButtonAdd, cypressButtonClear, cypressButtonRemove, cypressChangingColor, cypressCircle, cypressDefaultColor, cypressForm, cypressInput, cypressVisual } from "../constants";

describe('Работа Стэка', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/stack');
    });
    function addFirstItem(item) {
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).type(item)
            cy.get(cypressButtonAdd).should('not.be.disabled');
            cy.get(cypressButtonRemove).should('be.disabled');
            cy.get(cypressButtonClear).should('be.disabled');
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressButtonAdd).click();
            cy.get(cypressButtonRemove).should('be.disabled');
            cy.get(cypressButtonClear).should('be.disabled');
            cy.tick(SHORT_DELAY_IN_MS)
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
            cy.tick(SHORT_DELAY_IN_MS)
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
      it('Проверка корректности добавления в стек', () => {
        cy.clock()

        addFirstItem(111)
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).eq(0).should('have.text', '111').and('have.css', 'border', cypressDefaultColor)
            cy.tick(SHORT_DELAY_IN_MS)
        })

        addItem(10)
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).eq(1).should('have.text', '10').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressDefaultColor)
        })

        addItem(3)
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).eq(2).should('have.text', '3').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressDefaultColor)
        })
      })
      it('Проверка корректности удаления из стэка', () => {
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
            cy.get(cypressCircle).last().should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).eq(3).should('not.exist')
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
            cy.get(cypressCircle).should('not.exist')
        })
        cy.get(cypressForm).within(() => {
          cy.get(cypressInput).should('be.empty');
          cy.get(cypressButtonAdd).should('be.disabled');
          cy.get(cypressButtonRemove).should('be.disabled');
          cy.get(cypressButtonClear).should('be.disabled');
        })
      })
})