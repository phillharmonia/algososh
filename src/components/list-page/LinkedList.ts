class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next: LinkedListNode<T> | null = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  interface TLinkedList<T> {
    [Symbol.iterator](): Iterator<T>;
    prepend(value: T): void;
    append(value: T): void;
    addByIndex(value: T, index: number): void;
    deleteByIndex(index: number): void;
    deleteHead(): void;
    deleteTail(): void;
    toArray(): Array<T>;
  }
  
  export class LinkedList<T> implements TLinkedList<T> {
    private size: number;
    head: LinkedListNode<T> | null;
  
    constructor(array: Array<T> = []) {
      this.size = 0;
      this.head = null;
  
      for (const item of array) {
        this.append(item);
      }
    }
  
    *[Symbol.iterator]() {
      for (let current = this.head; current !== null; current = current.next) {
        yield current.value;
      }
    }
    prepend(value: T) {
      const node = new LinkedListNode(value);
      if (this.head === null) {
        this.head = node;
      } else {
        node.next = this.head;
        this.head = node;
      }
      this.size++;
    }
  
    append(value: T) {
      const node = new LinkedListNode(value);
      if (this.head === null) {
        this.head = node;
      } else {
        for (let current = this.head; current !== null; current = current.next) {
          if (current.next === null) {
            current.next = node;
            break;
          }
        }
      }
      this.size++;
    }
  
    addByIndex(value: T, index: number) {
      if (index < 0 || index > this.size + 1) {
        return;
      } else if (this.head === null || index === 0) {
        this.prepend(value);
      } else {
        let previous = this.head;
        while (index - 1 > 0 && previous.next !== null) {
          previous = previous.next;
          index--;
        }
        previous.next = new LinkedListNode(value, previous.next);
      }
      this.size++;
    }
  
    deleteByIndex(index: number) {
      if(index >= this.size){
        return
    }
    if(index === 0){
        this.deleteHead()
        return
    }
    let curr = this.head
    for(let i = 1; i < index; i++){
        curr= curr!.next
    }
    curr!.next = curr!.next!.next
    this.size--
    }
  
    deleteHead() {
      if (this.head) {
      this.head = this.head.next;
      this.size--;
      }
    }
  
    deleteTail() {
      if (this.head === null) {
        return;
      } else if (this.head.next === null) {
        this.head = null;
      } else {
        let current = this.head;
        while (current.next !== null && current.next.next !== null) {
          current = current.next;
        }
        current.next = null;
      }
      this.size--;
    }
    toArray() {
        let curr = this.head;
        let res: T[] = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res
    }
}