describe("Роутинг страниц", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Роутинг строки", () => {
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("Роутинг Фибоначчи", () => {
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Роутинг соортировки массива", () => {
    cy.get('[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Роутинг стека", () => {
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("Роутинг очереди", () => {
    cy.get('[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("Роутинг связный список", () => {
    cy.get('[href="/list"]').click();
    cy.contains("Связный список");
  });
});
