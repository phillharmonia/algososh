interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void;
    isEmpty: () => boolean;
    getSize: () => number;
    printQueue: () => Array<T | undefined>;
}

export class Queue<T> implements IQueue<T> {
    container: (T | undefined)[] = [];
    head = 0;
    tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head % this.size] = undefined;
        this.head = this.head + 1 === this.size ? 0 : this.head + 1;
        this.length--;
    };

    getSize = () => this.size;

    isEmpty = () => this.length === 0;


    printQueue = (): (T | undefined)[] => [...this.container];

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = Array(this.size);
    };
}