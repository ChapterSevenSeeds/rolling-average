declare module "RollingAverage/AverageCalculator" {
    export default abstract class AverageCalculator {
        /**
         * Adds a new sample to the rolling average.
         * @param sample The sample to add.
         */
        abstract addSample(sample: number): void;
        /**
         * Returns the current rolling average.
         */
        abstract getAverage(): number;
    }
}
declare module "utils/Queue" {
    export default class Queue<T> {
        private _head;
        private _tail;
        private _data;
        private _inverted;
        get length(): number;
        constructor(initialLength?: number);
        peekFront(): T;
        peekBack(): T;
        enqueue(item: T): void;
        dequeue(): T;
        private _resize;
    }
}
declare module "RollingAverage/FixedWindowRollingAverage" {
    import AverageCalculator from "RollingAverage/AverageCalculator";
    export default class FixedWindowRollingAverage extends AverageCalculator {
        private windowSize;
        private samples;
        private sum;
        constructor(windowSize: number);
        addSample(sample: number): void;
        getAverage(): number;
    }
}
declare module "RollingAverage/RegularAverage" {
    import AverageCalculator from "RollingAverage/AverageCalculator";
    export default class RegularAverage extends AverageCalculator {
        private sum;
        private count;
        addSample(sample: number): void;
        getAverage(): number;
    }
}
declare module "RollingAverage/TimeWindowRollingAverage" {
    import AverageCalculator from "RollingAverage/AverageCalculator";
    export default class TimeWindowRollingAverage extends AverageCalculator {
        private windowDuration;
        private samples;
        private sum;
        constructor(windowDuration: number);
        addSample(sample: number): void;
        getAverage(): number;
    }
}
declare module "RollingAverage/RollingAverageFactory" {
    import FixedWindowRollingAverage from "RollingAverage/FixedWindowRollingAverage";
    import RegularAverage from "RollingAverage/RegularAverage";
    import TimeWindowRollingAverage from "RollingAverage/TimeWindowRollingAverage";
    export default class RollingAverageFactory {
        /**
         * Creates a new rolling average with a fixed sample window.
         * @param windowSize The number of samples to include in the rolling average.
         */
        static fixedWindow(windowSize: number): FixedWindowRollingAverage;
        /**
         * Creates a new time window rolling average.
         * @param windowDuration The duration of the time window in milliseconds.
         */
        static timeWindow(windowDuration: number): TimeWindowRollingAverage;
        /**
         * Creates a class that calculates an average with no window.
         */
        static regular(): RegularAverage;
    }
}
declare module "index" {
    export { default as RollingAverageFactory } from "RollingAverage/RollingAverageFactory";
    export { default as FixedWindowRollingAverage } from "RollingAverage/FixedWindowRollingAverage";
    export { default as TimeWindowRollingAverage } from "RollingAverage/TimeWindowRollingAverage";
}
declare module "tests/FixedWindowRollingAverage.spec" { }
declare module "tests/Queue.spec" { }
declare module "tests/RegularAverage.spec" { }
declare module "utils/asyncSetTimeout" {
    export default function asyncSetTimeout(ms: number): Promise<void>;
}
declare module "tests/TimeWindowRollingAverage.spec" { }
