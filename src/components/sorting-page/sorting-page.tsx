import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const randomArr = (min: number, max: number) => {
    const length = Math.floor(Math.random() * (max - min + 1) + min);
    return Array.from({ length }, () => Math.floor(Math.random() * 101));
  };

  const [algorithm, setAlgorithm] = useState<"selectionSort" | "bubbleSort">(
    "selectionSort"
  );
  const [randomArray, setRandomArray] = useState<number[]>(randomArr(3, 17));
  const [isLoader, setIsLoader] = useState<Direction | boolean>(false);
  const [firstIndex, setFirstIndex] = useState<number | undefined>(undefined);
  const [lastIndex, setLastIndex] = useState<number | undefined>(undefined);
  const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(
    undefined
  );

  const bubbleSort = async (array: number[], direction: Direction) => {
    for (let i = array.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        setFirstIndex(j);
        setLastIndex(j + 1);
        await delay(DELAY_IN_MS);
        if (
          (direction === Direction.Ascending && array[j] > array[j + 1]) ||
          (direction === Direction.Descending && array[j] < array[j + 1])
        ) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          setRandomArray([...array]);
        }
      }
      setHighlightedIndex(i);
    }
    setFirstIndex(undefined);
    setLastIndex(undefined);
    setHighlightedIndex(0);
    setIsLoader(false);
  };

  const selectionSort = async (array: number[], direction: Direction) => {
    for (let i = 0; i < array.length - 1; i++) {
      setFirstIndex(i);
      let index = i;
      for (let j = i + 1; j < array.length; j++) {
        await delay(DELAY_IN_MS);
        setHighlightedIndex(j);
        if (
          (direction === Direction.Ascending && array[j] < array[index]) ||
          (direction === Direction.Descending && array[j] > array[index])
        ) {
          index = j;
        }
      }
      [array[i], array[index]] = [array[index], array[i]];
      setRandomArray([...array]);
      setHighlightedIndex(i);
    }
    setFirstIndex(undefined);
    setLastIndex(undefined);
    setHighlightedIndex(array.length - 1);
    setIsLoader(false);
  };

  const handleRadioButtonChange = (
    algorithm: "selectionSort" | "bubbleSort"
  ) => {
    setIsLoader(false);
    setHighlightedIndex(undefined);
    setAlgorithm(algorithm);
  };

  const handleDirectionChange = (direction: Direction) => {
    setHighlightedIndex(undefined);
    setIsLoader(direction);
    if (algorithm === "bubbleSort") {
      bubbleSort(randomArray, direction);
    } else {
      selectionSort(randomArray, direction);
    }
  };

  const newRandomArray = () => {
    setHighlightedIndex(undefined);
    setRandomArray(randomArr(3, 17));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            onClick={() => handleRadioButtonChange("selectionSort")}
            defaultChecked
          />
          <RadioInput
            label="Пузырёк"
            onClick={() => handleRadioButtonChange("bubbleSort")}
          />
        </div>
        <div className={styles.sorting_buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isLoader === Direction.Ascending}
            disabled={isLoader !== false}
            onClick={() => handleDirectionChange(Direction.Ascending)}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isLoader === Direction.Descending}
            disabled={isLoader !== false}
            onClick={() => handleDirectionChange(Direction.Descending)}
          />
        </div>
        <Button
          text="Новый массив"
          disabled={isLoader !== false}
          onClick={newRandomArray}
        />
      </form>
      <div className={styles.array}>
        {randomArray.map((number, index) => (
          <Column
            state={
              index === firstIndex || index === lastIndex
                ? ElementStates.Changing
                : highlightedIndex !== undefined &&
                  ((algorithm === "selectionSort" &&
                    index <= highlightedIndex) ||
                    (algorithm === "bubbleSort" && index >= highlightedIndex))
                ? ElementStates.Modified
                : ElementStates.Default
            }
            index={number}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
