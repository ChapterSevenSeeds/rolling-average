import RegularAverage from "../RollingAverage/RegularAverage";

describe("RegularAverage tests", () => {
    it("should be able to calculate the average", () => {
        const average = new RegularAverage();
        average.addSample(1);
        average.addSample(2);
        average.addSample(3);
        expect(average.getAverage()).toBe(2);
        average.addSample(4);
        expect(average.getAverage()).toBe(2.5);
        average.addSample(5);
        expect(average.getAverage()).toBe(3);
    });
});