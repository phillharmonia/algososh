import React, {  useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import Stack from "./Stack";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<Stack<number>>(new Stack<number>());
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);


  const handleAdd = async() => {
    if (inputValue !== "") {
      const newItem = Number(inputValue);
      await delay(SHORT_DELAY_IN_MS)
      stack.push(newItem);
      setInputValue("");
      setHighlightedIndex(stack.getSize() - 1);
      await delay(SHORT_DELAY_IN_MS)
      setHighlightedIndex(-1);
    }
  };

  const handleRemove = async() => {
    const removedItem = stack.peek();
    if (removedItem !== undefined) {
      setHighlightedIndex(stack.getSize() - 1);
      await delay(SHORT_DELAY_IN_MS)
      stack.pop();
      setHighlightedIndex(-1);
    }
  };

  
  const handleClear = () => {
    stack.clear();
    setStack(new Stack<number>());
  };
  

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.controls}>
          <Input
            placeholder="Введите значение"
            maxLength={4}
            value={inputValue}
            onChange={handleChangeInput}
            isLimitText={true}
          />
          <Button text="Добавить" disabled={inputValue === "" || stack.getSize() === 8} onClick={handleAdd} />
          <Button text="Удалить" disabled={stack.getSize() === 0} onClick={handleRemove} />
        </div>
        <Button text="Очистить" disabled={stack.getSize() === 0} onClick={handleClear} />
      </form>
      <div className={styles.visual}>
        {stack.getElements().map((item, index) => (
          <Circle
          key={index}
          letter={item.toString()}
          head={index === stack.getSize() - 1 ? "top" : null}
          index={index}
          state={
            index === highlightedIndex && stack.getSize() > 1
              ? ElementStates.Changing
              : ElementStates.Default
          }
        />
        ))}
      </div>
    </SolutionLayout>
  );
};