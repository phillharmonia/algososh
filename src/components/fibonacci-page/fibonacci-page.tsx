import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css"
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const FibonacciPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataForVisual, setDataForVisual] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFibonacciSequence = (n: number): number[] => {
    const sequence: number[] = [];
    if (n >= 1) sequence.push(1);
    if (n >= 2) sequence.push(1);
    for (let i = 2; i <= n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const n = parseInt((event.currentTarget.elements[0] as HTMLInputElement).value);
    if (!isNaN(n) && n >= 1 && n <= 19) {
      setIsLoading(true);
      setDataForVisual([]);
      const sequence = getFibonacciSequence(n);
      for (let i = 0; i < sequence.length; i++) {
        setDataForVisual(prevData => [...prevData, sequence[i]]);
        await delay(SHORT_DELAY_IN_MS);
      }
      setIsLoading(false);
    } else {
    }
  };

  useEffect(() => {
    setInputValue("");
    setDataForVisual([]);
  }, []);


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)}
          min={1}
          max={19}
          maxLength={19}
          isLimitText={true}
        />
        <Button text="Рассчитать" type="submit" disabled={inputValue === "" || parseInt(inputValue) > 19 || parseInt(inputValue) <= 0} isLoader={isLoading} />
      </form>
      <div className={styles.visual}>
        {dataForVisual.map((number, index) => (
          <Circle index={index} key={index} letter={number.toString()} />
        ))}
      </div>
    </SolutionLayout>
  );
};
