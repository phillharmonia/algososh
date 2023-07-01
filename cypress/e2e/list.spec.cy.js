import { cypressButtonAddByIndex, cypressButtonAddHead, cypressButtonAddTail, cypressButtonDeleteByIndex, cypressButtonDeleteHead, cypressButtonDeleteTail, cypressChangingColor, cypressCircle, cypressCircleSmall, cypressDefaultColor, cypressForm, cypressFormByIndex, cypressInput, cypressInputIndex, cypressModifiedColor, cypressVisual } from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Работа связного списка', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list');
    })
    function addItemInHead(item) {
        cy.clock();
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).type(item);
            cy.get(cypressButtonAddHead).should('not.be.disabled');
            cy.get(cypressButtonAddTail).should('not.be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressInputIndex).should('be.empty');
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
        cy.get(cypressForm).within(() => {
            cy.get(cypressButtonAddHead).click();
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('be.disabled');
            cy.get(cypressButtonDeleteTail).should('be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.text', item).and('have.css', 'border', cypressChangingColor)
        })
    }
    function addItemInTail(item) {
        cy.clock();
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).type(item);
            cy.get(cypressButtonAddHead).should('not.be.disabled');
            cy.get(cypressButtonAddTail).should('not.be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressInputIndex).should('be.empty');
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
        cy.get(cypressForm).within(() => {
            cy.get(cypressButtonAddTail).click();
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('be.disabled');
            cy.get(cypressButtonDeleteTail).should('be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.text', item).and('have.css', 'border', cypressChangingColor)
        })
    }
    function addItemByIndex(number, index) {
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).type(number);
            cy.get(cypressButtonAddHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonAddTail).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressInputIndex).type(index);
            cy.get(cypressButtonAddByIndex).should('not.be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('not.be.disabled');
            cy.get(cypressButtonAddByIndex).click();
        })
    }

    it('Кнопки должны быть отключены, если инпуты пусты', () => {
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).should('be.empty')
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressInputIndex).should('be.empty');
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
    })
    it('Проверка корректности отрисовки дефолтного списка', () => {
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).first().should('not.be.empty').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('head');
            cy.get(cypressCircle).eq(1).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircle).eq(2).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircle).its('length').then((length) => {
                if(length === 5) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
                if(length === 6) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                    cy.get(cypressCircle).eq(4).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
            })
            cy.get(cypressCircle).last().should('not.be.empty').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('tail');
        })
    })
    it('Проверка корректности добавления в Head', () => {
        cy.clock();
        addItemInHead('1234');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).first().should('have.text', '1234').and('have.css', 'border', cypressModifiedColor).siblings('div').contains('head');
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).first().should('have.text', '1234').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('head');
            cy.get(cypressCircle).its('length').then((length) => {
                if(length === 5) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
                if(length === 6) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                    cy.get(cypressCircle).eq(4).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
            })
            cy.get(cypressCircle).last().should('not.be.empty').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('tail');
        })
    })
    it('Проверка корректности добавления в Tail', () => {
        cy.clock();
        addItemInTail('4321');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressVisual).within(() => {
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).first().should('not.be.empty').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('head');
            cy.get(cypressCircle).its('length').then((length) => {
                if(length === 5) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
                if(length === 6) {
                    cy.get(cypressCircle).eq(3).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                    cy.get(cypressCircle).eq(4).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                }
            })
            cy.get(cypressCircle).last().should('not.be.empty').and('have.css', 'border', cypressDefaultColor).siblings('div').contains('tail');  
        })
    })
    it('Проверка корректности добавления по индексу', () => {
        cy.clock()
        addItemByIndex('4321', '3')
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.text', '4321').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircleSmall).should('have.text', '4321').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircleSmall).should('have.text', '4321').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircleSmall).should('have.text', '4321').and('have.css', 'border', cypressChangingColor)
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(0).should('not.have.text', '4321').and('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(1).should('not.have.text', '4321').and('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(2).should('not.have.text', '4321').and('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(3).should('have.text', '4321').and('have.css', 'border', cypressModifiedColor )
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressDefaultColor).and('not.be.empty');
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressDefaultColor).and('not.be.empty');
            cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressDefaultColor).and('not.be.empty');
            cy.get(cypressCircle).its('length').then((length) => {
                if(length === 4) {
                    cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('have.text', '4321');
                }
                if(length === 5) {
                    cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('have.text', '4321');
                    cy.get(cypressCircle).eq(4).should('have.css', 'border', cypressDefaultColor).and('not.be.empty');
                }
                if(length === 6) {
                    cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('have.text', '4321');
                    cy.get(cypressCircle).eq(4).should('not.be.empty').and('have.css', 'border', cypressDefaultColor);
                    cy.get(cypressCircle).eq(5).should('have.css', 'border', cypressDefaultColor).and('not.be.empty');
                }
            })
        })
    })
    it('Проверка корректности удаления из Head', () => {
        cy.clock()
        addItemInHead('563')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).first().should('have.css', 'border', cypressModifiedColor).and('have.text', '563')
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).first().should('have.css', 'border', cypressDefaultColor).and('have.text', '563');
        })
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).should('be.empty')
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
            cy.get(cypressButtonDeleteHead).click();
            cy.get(cypressInput).should('be.empty')
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('be.disabled');
            cy.get(cypressButtonDeleteTail).should('be.disabled');
        })
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.css', 'border', cypressChangingColor).and('have.text', '563')
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).first().should('have.css', 'border', cypressDefaultColor).and('not.have.text', '563');
        })
    })
    it('Проверка корректности удаления из Tail', () => {
        cy.clock()
        addItemInTail('563')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircle).last().should('have.css', 'border', cypressModifiedColor).and('have.text', '563')
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).last().should('have.css', 'border', cypressDefaultColor).and('have.text', '563');
        })
        cy.get(cypressForm).within(() => {
            cy.get(cypressInput).should('be.empty')
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).should('not.be.disabled');
            cy.get(cypressButtonDeleteTail).click();
            cy.get(cypressInput).should('be.empty')
            cy.get(cypressButtonAddHead).should('be.disabled');
            cy.get(cypressButtonAddTail).should('be.disabled');
            cy.get(cypressButtonDeleteHead).should('be.disabled');
            cy.get(cypressButtonDeleteTail).should('be.disabled');
        })
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.css', 'border', cypressChangingColor).and('have.text', '563')
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).last().should('have.css', 'border', cypressDefaultColor).and('not.have.text', '563');
        })
    })
    it('Проверка корректности удаления по индексу', () => {
        cy.clock();
        addItemByIndex('1234', '3')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(cypressVisual).within(() => {
            cy.get(cypressCircleSmall).should('have.css', 'border', cypressChangingColor).and('have.text', '1234')
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressModifiedColor).and('have.text', '1234');
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('have.text', '1234');
        })
        cy.get(cypressFormByIndex).within(() => {
            cy.get(cypressInputIndex).type('3');
            cy.get(cypressButtonAddByIndex).should('not.be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('not.be.disabled');
            cy.get(cypressButtonDeleteByIndex).click();
            cy.get(cypressButtonAddByIndex).should('be.disabled');
            cy.get(cypressButtonDeleteByIndex).should('be.disabled');
        })
        cy.get(cypressVisual).within(() => {
            cy.tick();
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS)
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressChangingColor);
            cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(0).should('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircle).eq(1).should('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircle).eq(2).should('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor);
            cy.get(cypressCircleSmall).should('have.css', 'border', cypressChangingColor);
            cy.tick(SHORT_DELAY_IN_MS);
            cy.get(cypressCircle).eq(3).should('have.css', 'border', cypressDefaultColor).and('not.have.text', '1234')
        })
    })

})