export default class Queue<T> {
    private _head: number = 0;
    private _tail: number = 0;
    private _data: T[];
    private _inverted: boolean = false;

    public get length(): number {
        if (!this._inverted) {
            return this._tail - this._head;
        } else {
            return this._data.length - this._head + this._tail;
        }
    }

    public constructor(initialLength: number = 10) {
        if (initialLength < 1) {
            throw new Error("initialLength must be at least 1");
        }
        this._data = new Array<T>(initialLength);
    }

    public peekFront(): T {
        if (this._head === this._tail && !this._inverted) {
            throw new Error("Queue is empty");
        }
        
        return this._data[this._head];
    }

    public peekBack(): T {
        if (this._head === this._tail && !this._inverted) {
            throw new Error("Queue is empty");
        }
        
        return this._data[(this._tail + this._data.length - 1) % this._data.length];
    }

    public enqueue(item: T): void {
        if (this.length === this._data.length) {
            this._resize();
        }

        const index = this._tail++;
        this._tail %= this._data.length;
        if (this._tail === 0) {
            this._inverted = true;
        }
        this._data[index] = item;
    }

    public dequeue(): T {
        if (this._head === this._tail && !this._inverted) {
            throw new Error("Queue is empty");
        }
        
        const index = this._head++;
        this._head %= this._data.length;
        if (this._head === 0) {
            this._inverted = false;
        }
        return this._data[index];
    }

    private _resize(): void {
        const newLength = Math.floor(this._data.length * 1.7);
        const newData = new Array<T>(newLength);
        for (let i = 0; i < this._data.length; i++) {
            newData[i] = this._data[(this._head + i) % this._data.length];
        }

        this._head = 0;
        this._tail = this._data.length;
        this._data = newData;
        this._inverted = false;
    }
}