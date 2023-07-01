import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './queue-page.module.css'
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { Queue } from "./Queue";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue] = useState(() => new Queue<string>(7));
  const [inputValue, setInputValue] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [array, setArray] = useState<(string | undefined)[]>(Array(7).fill(""));
  const [tail, setTail] = useState<number>(queue.tail);
  const [head, setHead] = useState<number>(queue.head);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);

  const handleAdd = async() => {
    if(inputValue !== '') {
      setIsLoadingAdd(true)
      const newItem = inputValue
      queue.enqueue(newItem)
      setInputValue("")
      const newArray = [...queue.container]
      setArray(newArray)
      setTail(queue.tail)
      setHighlightedIndex(tail % queue.getSize())
      await delay(SHORT_DELAY_IN_MS)
      setHighlightedIndex(-1)
      setIsLoadingAdd(false)
      await delay(SHORT_DELAY_IN_MS)
    }
  }
  const handleRemove = async() => {
    setIsLoadingRemove(true)
    queue.dequeue();
    const newArray = [...queue.container]
    setArray(newArray)
    setHighlightedIndex(head % queue.getSize())
    await delay(SHORT_DELAY_IN_MS)
    setHead(queue.head)
    setHighlightedIndex(-1)
    setIsLoadingRemove(false)
    await delay(SHORT_DELAY_IN_MS)
  }

  const handleClear = () => {
    if (!queue.isEmpty()) {
    queue.clear();
    setArray([...queue.container]);
    setTail(queue.tail);
    setHead(queue.head);
    setHighlightedIndex(-1);
    }
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  

  return (
    <SolutionLayout title="Очередь">
 <form className={styles.form} onSubmit={handleSubmit} data-cypress='form'>
        <div className={styles.controls}>
          <Input
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleChangeInput}
            data-cypress="input"
          />
          <Button text="Добавить" onClick={handleAdd} isLoader={isLoadingAdd} disabled={!inputValue || queue.length === 7} data-cypress="button_add" />
          <Button text="Удалить" onClick={handleRemove} isLoader={isLoadingRemove} disabled={queue.isEmpty()} data-cypress="button_remove" />
        </div>
        <Button text="Очистить" onClick={handleClear} disabled={queue.isEmpty()} data-cypress="button_clear" />
      </form>
      <div className={styles.visual} data-cypress='visual'>
      {array.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={!queue.isEmpty() && index === head ? "head" : null}
              tail={(index === tail - 1 && !queue.isEmpty()) ? "tail" : ""}
              state={index === highlightedIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </div>
    </SolutionLayout>
  );
};
