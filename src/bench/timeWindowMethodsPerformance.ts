import _ from "lodash";
import TimeWindowRollingAverage from "../RollingAverage/TimeWindowRollingAverage";
import { Bench } from "./utils";
import { performance } from "perf_hooks";

export const timeWindowMethodsPerformance: Bench = {
    name: "Time window rolling average performance",
    run: async () => {
        const itemCount = 10000000;

        const rollingAverage = new TimeWindowRollingAverage(50);

        for (let i = 0; i < itemCount; ++i) {
            rollingAverage.addSample(_.random(1000));
        }

        const currentTime = performance.now();

        rollingAverage.getAverage();

        return {
            itemCount,
            metric: "milliseconds",
            results: performance.now() - currentTime,
            type: "standalone, single run",
            label: "Time to calculate the average"
        };
    },
};
