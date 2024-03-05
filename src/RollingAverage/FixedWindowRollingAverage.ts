import AverageCalculator from "./AverageCalculator";
import Queue from "../utils/Queue";

export default class FixedWindowRollingAverage extends AverageCalculator {
    private windowSize: number;
    private samples: Queue<number>;
    private sum: number = 0;

    public constructor(windowSize: number) {
        if (windowSize < 1) {
            throw new Error("windowSize must be at least 1");
        }

        super();
        this.windowSize = windowSize;
        this.samples = new Queue<number>(windowSize);
    }
    
    public addSample(sample: number): void {
        this.samples.enqueue(sample);
        this.sum += sample;
        if (this.samples.length > this.windowSize) {
            this.sum -= this.samples.dequeue();
        }
    }

    public getAverage(): number {
        return this.sum / this.samples.length;
    }
}