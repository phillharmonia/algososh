import { delay } from "q";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";

export async function bubbleSortForTest(array: number[], direction: Direction) {
  const length = array.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        (direction === Direction.Ascending && array[j] > array[j + 1]) ||
        (direction === Direction.Descending && array[j] < array[j + 1])
      ) {
        await delay(DELAY_IN_MS);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}
  export const selectionSortForTest = async (array: number[], direction: Direction) => {
    for (let i = 0; i < array.length - 1; i++) {
      let index = i;
      for (let j = i + 1; j < array.length; j++) {
        if (
          (direction === Direction.Ascending && array[j] < array[index]) ||
          (direction === Direction.Descending && array[j] > array[index])
        ) {
          index = j;
        }
      }
      [array[i], array[index]] = [array[index], array[i]];
    }
  };
