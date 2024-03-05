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