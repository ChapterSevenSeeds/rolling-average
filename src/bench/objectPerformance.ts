import _ from "lodash";
import { Bench, createQueueAdapter, QueueId } from "./utils";

export const objectPerformance: Bench = {
    name: "Object performance of TimeWindowRollingAverage utility queue vs yocto-queue",
    run: () => {
        const objectPerformanceQueues = [
            createQueueAdapter<object>("internal"),
            createQueueAdapter<object>("yocto-queue"),
        ];
        const objectPerformanceTestSize = 1000000;
        const objectPerformanceTestRuns = 10;
        const objectPerformanceRunTimes: Record<QueueId, number[]> = {
            internal: [],
            "yocto-queue": [],
        };
        for (let run = 0; run < objectPerformanceTestRuns; ++run) {
            for (const queue of objectPerformanceQueues) {
                const startTime = performance.now();
                for (let i = 0; i < objectPerformanceTestSize; ++i) {
                    queue.enqueue({ myProp: _.random(1000) });
                }

                for (let i = 0; i < objectPerformanceTestSize; ++i) {
                    queue.dequeue();
                }

                for (let i = 0; i < objectPerformanceTestSize; ++i) {
                    queue.enqueue({ myProp: _.random(1000) });
                }

                for (let i = 0; i < objectPerformanceTestSize; ++i) {
                    queue.dequeue();
                }

                objectPerformanceRunTimes[queue.id].push(
                    performance.now() - startTime
                );
            }
        }

        return {
            metric: "milliseconds",
            results: objectPerformanceRunTimes,
            type: "competitive, multiple runs",
            itemCount: objectPerformanceTestSize * objectPerformanceTestRuns
        };
    },
};
