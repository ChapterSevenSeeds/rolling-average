import _ from "lodash";
import sizeof from "js-sizeof";
import { Bench, createQueueAdapter, QueueId } from "./utils";

export const objectMemory: Bench = {
    name: "Object memory usage of TimeWindowRollingAverage utility queue vs yocto-queue",
    run: () => {
        const objectMemoryItemCount = 50000;
        const objectMemoryQueues = [
            createQueueAdapter<object>("internal"),
            createQueueAdapter<object>("yocto-queue"),
        ];
        const objectMemoryResults: Record<QueueId, number> = {
            internal: 0,
            "yocto-queue": 0,
        };
        for (const queue of objectMemoryQueues) {
            for (let i = 0; i < objectMemoryItemCount; ++i) {
                queue.enqueue({ myProp: _.random(1000) });
            }

            objectMemoryResults[queue.id] = sizeof(queue);
        }

        return {
            metric: "bytes",
            results: objectMemoryResults,
            type: "competitive, single run",
            itemCount: objectMemoryItemCount
        };
    },
};
