import FixedWindowRollingAverage from "./FixedWindowRollingAverage";
import RegularAverage from "./RegularAverage";
import TimeWindowRollingAverage from "./TimeWindowRollingAverage";

export default class RollingAverageFactory {
    /**
     * Creates a new rolling average with a fixed sample window.
     * @param windowSize The number of samples to include in the rolling average.
     */
    public fixedWindow(windowSize: number): FixedWindowRollingAverage {
        return new FixedWindowRollingAverage(windowSize);
    }

    /**
     * Creates a new time window rolling average.
     * @param windowDuration The duration of the time window in milliseconds.
     */
    public timeWindow(windowDuration: number): TimeWindowRollingAverage {
        return new TimeWindowRollingAverage(windowDuration);
    }

    /**
     * Creates a class that calculates an average with no window.
     */
    public regular(): RegularAverage {
        return new RegularAverage();
    }
}