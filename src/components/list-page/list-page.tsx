import React, { FormEventHandler, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { TAnimation, list } from "./utills";

export const ListPage: React.FC = () => {
  const [linkedList] = useState(list);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [visual, setVisual] = useState<string[]>([...linkedList]);
  const [head, setHead] = useState<"head" | JSX.Element | null>("head");
  const [tail, setTail] = useState<JSX.Element | null>(null);
  const [newIndex, setNewIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<number | null>(0);
  const [deleteOldItem, setDeleteOldItem] = useState<number | null>(null);
  const [deleteOldIndex, setDeleteOldIndex] = useState<boolean>(false);
  const [animation, setAnimation] = useState<TAnimation | null>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleChangeInputIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(+event.target.value);
  }

  const handlePrepend: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
    setAnimation("prepend");
    linkedList.prepend(inputValue);
    setNewItem(0);
    setHead(
      <Circle
        isSmall={true}
        letter={inputValue}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setVisual([...linkedList]);
    setNewIndex(0);
    setHead("head");
    await delay(SHORT_DELAY_IN_MS);
    setNewIndex(null);
    setInputValue("");
    setAnimation(null);
    }
  };

  const handleAppend = async () => {
    setAnimation("append");
    linkedList.append(inputValue);
    setNewItem(visual.length - 1);
    setHead(
      <Circle
        isSmall={true}
        letter={inputValue}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setHead(null);
    setVisual([...linkedList]);
    setNewIndex(visual.length);
    await delay(SHORT_DELAY_IN_MS);
    setNewIndex(null);
    setNewItem(null);
    setInputValue("");
    setAnimation(null);
  };

  const handleDeleteHead = async () => {
    setAnimation("deleteOldHead");
    setDeleteOldItem(0);
    setVisual(["", ...[...linkedList].slice(1)]);
    setTail(
      <Circle
        isSmall={true}
        letter={[...linkedList][0]}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setDeleteOldItem(null);
    setTail(null);
    linkedList.deleteHead();
    setVisual([...linkedList]);
    setAnimation(null);
  };

  const handleDeleteTail = async () => {
    setAnimation("deleteOldTail");
    setDeleteOldItem([...linkedList].length - 1);
    setVisual([...[...linkedList].slice(0, -1), ""]);
    setTail(
      <Circle
        isSmall={true}
        letter={[...linkedList].at(-1)}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setDeleteOldItem(null);
    setTail(null);
    linkedList.deleteTail();
    setVisual([...linkedList]);
    setAnimation(null);
  };

  const handleAddIndex: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!inputValue  || inputIndex > -1){
    setAnimation("addNewIndex");
    linkedList.addByIndex(inputValue, inputIndex);
    setHead(
      <Circle
        isSmall={true}
        letter={inputValue}
        state={ElementStates.Changing}
      />
    );

    for (let i = 0; i <= inputIndex; i++) {
      setNewItem(i);
      await delay(SHORT_DELAY_IN_MS);
    }

    setHead(null);
    setVisual([...linkedList]);
    setNewIndex(inputIndex);
    await delay(SHORT_DELAY_IN_MS);
    setNewIndex(null);
    setInputValue("");
    setInputIndex(-1);
    setAnimation(null);
  }
  };

  const handleDeleteIndex = async () => {
    setAnimation("deleteOldIndex");
    setDeleteOldIndex(true);
    for (let i = 0; i <= inputIndex; i++) {
      setDeleteOldItem(i);
      await delay(SHORT_DELAY_IN_MS);
    }
    setVisual(
      visual.map((i, index) =>
        inputIndex === index ? "" : i
      )
    );
    setDeleteOldItem(null);
    setTail(
      <Circle
        isSmall={true}
        letter={visual[inputIndex]}
        state={ElementStates.Changing}
      />
    );
    await delay(SHORT_DELAY_IN_MS);
    setTail(null);
    linkedList.deleteByIndex(inputIndex);
    setVisual([...linkedList]);
    setInputIndex(-1);
    setDeleteOldIndex(false);
    setAnimation(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.forms}>
        <form className={styles.form}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            maxLength={4}
            value={inputValue}
            isLimitText={true}
            onChange={handleChangeInput}
          />
          <div className={styles.button_container}>
            <Button
              text="Добавить в head"
              disabled={!inputValue || animation !== null}
              isLoader={animation === "prepend"}
              onClick={handlePrepend}
            />
            <Button
              text="Добавить в tail"
              disabled={!inputValue ||animation !== null}
              isLoader={animation === "append"}
              onClick={handleAppend}
            />
            <Button
              text="Удалить из head"
              disabled={
                setVisual.length === 0 || animation !== null
              }
              isLoader={animation === "deleteOldHead"}
              onClick={handleDeleteHead}
            />
            <Button
              text="Удалить из tail"
              disabled={
                setVisual.length === 0 || animation !== null
              }
              isLoader={animation === "deleteOldTail"}
              onClick={handleDeleteTail}
            />
          </div>
        </form>
        <form className={styles.form}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            value={inputIndex === -1 ? "" : inputIndex}
            type="number"
            onChange={handleChangeInputIndex}
          />
          <div className={styles.button_container}>
            <Button
              text="Добавить по индексу"
              disabled={
                inputIndex <= -1 ||
                !inputValue ||
                animation !== null ||
                inputIndex > setVisual.length
              }
              isLoader={animation === "addNewIndex"}
              onClick={handleAddIndex}
            />
            <Button
              text="Удалить по индексу"
              type="button"
              disabled={
                inputIndex <= -1 ||
                animation !== null ||
                inputIndex > visual.length - 1
              }
              isLoader={animation === "deleteOldIndex"}
              onClick={handleDeleteIndex}
            />
          </div>
        </form>
      </div>
      <div className={styles.visual}>
        {visual.map((value, index) => (
          <div key={index} className={styles.visual_arrow}>
            <Circle
  letter={value.toString()}
  index={index}
  head={index === newItem ? head : index === 0 ? "head" : null}
  tail={
    index === inputIndex || index === deleteOldItem
      ? tail
      : index === visual.length - 1
      ? "tail"
      : null
  }
  state={
    (newItem !== null && index < newItem && inputIndex > -1) ||
    (deleteOldItem !== null && index <= deleteOldItem && deleteOldIndex)
      ? ElementStates.Changing
      : index === newIndex
      ? ElementStates.Modified
      : ElementStates.Default
  }
/>
            {visual.length - 1 !== index && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
