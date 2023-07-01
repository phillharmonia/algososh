import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { reverseString } from "./utills";

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [visual, setVisual] = useState<string[]>([]);
  const [firstIndex, setFirstIndex] = useState<number>(-1);
  const [lastIndex, setLastIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reverseInput = async () => {
    setIsLoading(true);
    const reversedString = reverseString(inputValue);
    const dataArray = reversedString.split("");
    const dataLength = dataArray.length;
    for (let i = 0; i < Math.floor(dataLength / 2); i++) {
      setFirstIndex(i);
      setLastIndex(dataLength - 1 - i);
      await delay(DELAY_IN_MS);
      [dataArray[i], dataArray[dataLength - 1 - i]] = [
        dataArray[dataLength - 1 - i],
        dataArray[i],
      ];
      setVisual([...dataArray]);
    }
    setFirstIndex(-1);
    setLastIndex(-1);
    setIsLoading(false);
  };

  const getElementState = (index: number): ElementStates => {
    if (index === firstIndex || index === lastIndex) {
      return ElementStates.Changing;
    } else if (index < firstIndex || index > lastIndex) {
      return ElementStates.Modified;
    } else {
      return ElementStates.Default;
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      const reversedString = reverseString(trimmedValue);
      const dataArray = reversedString.split("");
      setVisual([...dataArray]);
      reverseInput();
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={submitHandler} data-cypress='form'>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          data-cypress="input"
        />
        <Button text="Развернуть" isLoader={isLoading} type="submit" disabled={!inputValue} data-cypress="button_add" />
      </form>
      <div className={styles.visual} data-cypress='visual'>
        {visual.map((letter, index) => (
          <Circle
            key={index}
            letter={letter}
            state={getElementState(index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
