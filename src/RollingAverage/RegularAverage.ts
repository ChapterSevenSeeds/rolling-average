import AverageCalculator from "./AverageCalculator";

export default class RegularAverage extends AverageCalculator {
    private sum: number = 0;
    private count: number = 0;

    public addSample(sample: number): void {
        this.sum += sample;
        this.count++;
    }

    public getAverage(): number {
        return this.sum / this.count;
    }
}