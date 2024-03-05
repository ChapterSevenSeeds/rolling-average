import AverageCalculator from "./AverageCalculator";
import Queue from "../utils/Queue";

export default class TimeWindowRollingAverage extends AverageCalculator {
    private windowDuration: number;
    private samples: Queue<{ time: number, value: number }> = new Queue<{ time: number, value: number }>();
    private sum: number = 0;

    public constructor(windowDuration: number) {
        if (windowDuration < 1) {
            throw new Error("windowDuration must be at least 1");
        }

        super();
        this.windowDuration = windowDuration;
    }

    public addSample(sample: number): void {
        this.samples.enqueue({ time: Date.now(), value: sample });
        this.sum += sample;
    }

    public getAverage(): number {
        const now = Date.now();
        while (now - this.samples.peekFront().time >= this.windowDuration) {
            this.sum -= this.samples.dequeue().value;
        }

        return this.sum / this.samples.length;
    }
}