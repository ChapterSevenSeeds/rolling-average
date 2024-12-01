import _ from "lodash";
import sizeof from "js-sizeof";
import { Bench, createQueueAdapter, QueueId } from "./utils";

export const primitiveMemory: Bench = {
    name: "Primitive memory usage of TimeWindowRollingAverage utility queue vs yocto-queue",
    run: () => {
        const primitiveMemoryItemCount = 50000;
        const primitiveMemoryQueues = [
            createQueueAdapter<number>("internal"),
            createQueueAdapter<number>("yocto-queue"),
        ];
        const primitiveMemoryResults: Record<QueueId, number> = {
            internal: 0,
            "yocto-queue": 0,
        };
        for (const queue of primitiveMemoryQueues) {
            for (let i = 0; i < primitiveMemoryItemCount; ++i) {
                queue.enqueue(_.random(1000));
            }

            primitiveMemoryResults[queue.id] = sizeof(queue.instance);
        }

        return {
            metric: "bytes",
            results: primitiveMemoryResults,
            type: "competitive, single run",
            itemCount: primitiveMemoryItemCount
        }
    },
};
