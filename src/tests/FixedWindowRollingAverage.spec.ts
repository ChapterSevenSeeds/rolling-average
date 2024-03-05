import FixedWindowRollingAverage from "../RollingAverage/FixedWindowRollingAverage";

describe("FixedWindowRollingAverage tests", () => {
    it("should be able to calculate the average", () => {
        const average = new FixedWindowRollingAverage(3);
        average.addSample(1);
        average.addSample(2);
        average.addSample(3);
        expect(average.getAverage()).toBe(2);
        average.addSample(4);
        expect(average.getAverage()).toBe(3);
        average.addSample(5);
        expect(average.getAverage()).toBe(4);
    });
});