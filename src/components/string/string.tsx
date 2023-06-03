import React, { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { Input } from "../ui/input/input";

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [visual, setVisual] = useState<string[]>([]);
  const [firstIndex, setFirstIndex] = useState<number>(-1);
  const [lastIndex, setLastIndex] = useState<number>(-1);

  const reverseInput = async () => {
    const dataArray = inputValue.split("");
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
      const dataArray = trimmedValue.split("");
      setVisual([...dataArray]);
      reverseInput();
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <Button text="Развернуть" type="submit" />
      </form>
      <div className={styles.visual}>
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
