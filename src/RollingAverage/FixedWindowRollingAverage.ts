import AverageCalculator from "./AverageCalculator";
import Queue from "../utils/Queue";
import { assertGuardEquals, tags } from "typia";

export default class FixedWindowRollingAverage extends AverageCalculator {
    private windowSize: number;
    private samples: Queue<number>;
    private sum: number = 0;

    public constructor(windowSize: number) {
        assertGuardEquals<number & tags.Minimum<1> & tags.Type<"uint32">>(windowSize);

        super();
        this.windowSize = windowSize;
        this.samples = new Queue<number>(windowSize);
    }
    
    public addSample(sample: number): void {
        assertGuardEquals<number>(sample);
        
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