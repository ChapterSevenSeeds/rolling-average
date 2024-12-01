import asyncSetTimeout from "../utils/asyncSetTimeout";
import TimeWindowRollingAverage from "../RollingAverage/TimeWindowRollingAverage";

describe("TimeWindowRollingAverage tests", () => {
    it("should be able to calculate the average with no timing", () => {
        const average = new TimeWindowRollingAverage(1000);
        average.addSample(1);
        average.addSample(2);
        average.addSample(3);
        expect(average.getAverage()).toBe(2);
        average.addSample(4);
        expect(average.getAverage()).toBe(2.5);
        average.addSample(5);
        expect(average.getAverage()).toBe(3);
    });

    it("should be able to calculate the average with timing", async () => {
        const average = new TimeWindowRollingAverage(1000);
        average.addSample(1);
        await asyncSetTimeout(200);
        average.addSample(2);
        await asyncSetTimeout(200);
        average.addSample(3);
        await asyncSetTimeout(200);
        expect(average.getAverage()).toBe(2);
        await asyncSetTimeout(400);
        expect(average.getAverage()).toBe(2.5);
        average.addSample(4);
        await asyncSetTimeout(200);
        expect(average.getAverage()).toBe(3.5);
    });

    it("should not throw when getting the average with no samples", async () => {
        const average = new TimeWindowRollingAverage(1000);
        expect(() => average.getAverage()).not.toThrow();
    });
});