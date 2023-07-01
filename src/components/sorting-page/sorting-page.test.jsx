import { Direction } from "../../types/direction";
import { bubbleSortForTest, selectionSortForTest } from "./utills";

describe('Тест Соортировки', () => {
    jest.setTimeout(10000); 
    it("BubbleSort корректно сортирует пустой массив", async () => {
        const array = [];
    
        await bubbleSortForTest(array, Direction.Ascending);
    
        expect(array).toHaveLength(0);
      });
    
      it("BubbleSort корректно сортирует массив из одного элемента", async () => {
        const array = [42];
    
        await bubbleSortForTest(array, Direction.Ascending);
    
        expect(array).toEqual([42]);
      });
    
      it("SelectionSort корректно сортирует массив из нескольких элементов", async () => {
        const array = [5, 3, 1, 4, 2];
        const sortedArray = [1, 2, 3, 4, 5];
    
        await selectionSortForTest(array, Direction.Ascending);
    
        expect(array).toEqual(sortedArray);
      });
      it("SelectionSort корректно сортирует пустой массив", async () => {
        const array = [];
    
        await selectionSortForTest(array, Direction.Ascending);
    
        expect(array).toHaveLength(0);
      });
    
      it("SelectionSort корректно сортирует массив из одного элемента", async () => {
        const array = [42];
    
        await selectionSortForTest(array, Direction.Ascending);
    
        expect(array).toEqual([42]);
      });
    
      it("selectionSortForTest корректно сортирует массив из нескольких элементов", async () => {
        const array = [5, 3, 1, 4, 2];
        const sortedArray = [1, 2, 3, 4, 5];
    
        await selectionSortForTest(array, Direction.Ascending);
    
        expect(array).toEqual(sortedArray);
      });
})