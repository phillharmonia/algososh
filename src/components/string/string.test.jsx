import { reverseString } from "./utills";
describe('Тест String', () => {
  it('Тест с чётным количеством символов', () => {
    const input = 'abcd';
    const expectedOutput = 'dcba';
    expect(reverseString(input)).toBe(expectedOutput);
  });

  it('Тест с нечетным количеством символов', () => {
    const input = 'abcde';
    const expectedOutput = 'edcba';
    expect(reverseString(input)).toBe(expectedOutput);
  });

  it('Тест с одним символом', () => {
    const input = 'a';
    const expectedOutput = 'a';
    expect(reverseString(input)).toBe(expectedOutput);
  });

  it('Тест с пустой строкой', () => {
    const input = '';
    const expectedOutput = '';
    expect(reverseString(input)).toBe(expectedOutput);
  });
});
