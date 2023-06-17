import { LinkedList } from "./LinkedList";

export const randomArr = (min: number, max: number) => {
    const length = Math.floor(Math.random() * (max - min + 1) + min);
    return Array.from({ length }, () => Math.floor(Math.random() * 101));
  };
  export type TAnimation = | "prepend"
  | "append"
  | "addNewIndex"
  | "deleteOldIndex"
  | "deleteOldHead"
  | "deleteOldTail";
  export const list = new LinkedList<string>(randomArr(4, 6).map((item) => item.toString()))