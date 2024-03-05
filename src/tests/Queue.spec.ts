import Queue from "../utils/Queue";

describe("Queue tests", () => {
    it("should be able to enqueue and dequeue items", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        queue.enqueue(4);
        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBe(4);
    });

    it("should be able to peek the front item", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.peekFront()).toBe(1);
        queue.dequeue();
        expect(queue.peekFront()).toBe(2);
    });

    it("should be able to peek the back item", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.peekBack()).toBe(3);
        queue.enqueue(4);
        expect(queue.peekBack()).toBe(4);
    });

    it("should be able to wrap around", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        queue.enqueue(4);
        queue.enqueue(5);
        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBe(4);
        expect(queue.dequeue()).toBe(5);
    });

    it("should be able to resize", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);
        queue.enqueue(6);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBe(4);
        expect(queue.dequeue()).toBe(5);
        expect(queue.dequeue()).toBe(6);
    });

    it("should be able to resize 2", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.dequeue();
        queue.dequeue();
        queue.enqueue(4);
        queue.enqueue(5);
        queue.enqueue(6);
        queue.dequeue();
        queue.enqueue(7);
        expect(queue.dequeue()).toBe(4);
        expect(queue.dequeue()).toBe(5);
        expect(queue.dequeue()).toBe(6);
        expect(queue.dequeue()).toBe(7);
    });

    it("should be able to return the length", () => {
        const queue = new Queue<number>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.length).toBe(3);
        queue.dequeue();
        queue.dequeue();
        queue.enqueue(4);
        queue.enqueue(5);
        queue.enqueue(6);
        expect(queue.length).toBe(4);
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        expect(queue.length).toBe(0);
    });

    it("should throw when peeking an empty queue", () => {
        const queue = new Queue<number>();
        expect(() => queue.peekFront()).toThrow("Queue is empty");
        expect(() => queue.peekBack()).toThrow("Queue is empty");
    });

    it("should throw when dequeuing an empty queue", () => {
        const queue = new Queue<number>();
        expect(() => queue.dequeue()).toThrow("Queue is empty");
    });

    it("should throw when creating a queue with a length of 0", () => {
        expect(() => new Queue<number>(0)).toThrow();
    });

    it("should throw when creating a queue with a negative length", () => {
        expect(() => new Queue<number>(-1)).toThrow();
    });

    it("should throw when creating a queue with a non-integer length", () => {
        expect(() => new Queue<number>(1.5)).toThrow();
    });
})