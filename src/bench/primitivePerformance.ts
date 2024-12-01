import _ from "lodash";
import { Bench, createQueueAdapter, QueueId } from "./utils";

export const primitivePerformance: Bench = {
    name: "Primitive performance of TimeWindowRollingAverage utility queue vs yocto-queue",
    run: () => {
        const primitivePerformanceQueues = [
            createQueueAdapter<number>("internal"),
            createQueueAdapter<number>("yocto-queue"),
        ];
        const primitivePerformanceTestSize = 1000000;
        const primitivePerformanceTestRuns = 10;
        const primitivePerformanceRunTimes: Record<QueueId, number[]> = {
            internal: [],
            "yocto-queue": [],
        };
        for (let run = 0; run < primitivePerformanceTestRuns; ++run) {
            for (const queue of primitivePerformanceQueues) {
                const startTime = performance.now();
                for (let i = 0; i < primitivePerformanceTestSize; ++i) {
                    queue.enqueue(_.random(1000));
                }

                for (let i = 0; i < primitivePerformanceTestSize; ++i) {
                    queue.dequeue();
                }

                for (let i = 0; i < primitivePerformanceTestSize; ++i) {
                    queue.enqueue(_.random(1000));
                }

                for (let i = 0; i < primitivePerformanceTestSize; ++i) {
                    queue.dequeue();
                }

                primitivePerformanceRunTimes[queue.id].push(
                    performance.now() - startTime
                );
            }
        }

        return {
            metric: "milliseconds",
            results: primitivePerformanceRunTimes,
            type: "competitive, multiple runs",
            itemCount: primitivePerformanceTestSize * primitivePerformanceTestRuns
        };
    },
};
