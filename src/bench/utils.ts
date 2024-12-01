import prettyBytes from "pretty-bytes";
import prettyMs from "pretty-ms";
import YoctoQueue from "yocto-queue";
import Queue from "../utils/Queue";
import chalk from "chalk";

export const queueIds = ["internal", "yocto-queue"] as const;
export type QueueId = (typeof queueIds)[number];
export type Metric = "milliseconds" | "bytes";

export type BenchResult =
    | {
          type: "competitive, multiple runs";
          results: Record<QueueId, number[]>;
          metric: Metric;
          itemCount: number;
      }
    | {
          type: "competitive, single run";
          results: Record<QueueId, number>;
          metric: Metric;
          itemCount: number;
      }
    | {
          type: "standalone, single run";
          results: number;
          metric: Metric;
          itemCount: number;
          label: string;
      };

export type Bench = {
    name: string;
    run: () => BenchResult | Promise<BenchResult>;
};

export const queueIdToName: Record<QueueId, string> = {
    internal: "TimeWindowRollingAverage utility queue",
    "yocto-queue": "Yocto-Queue",
};

export function coloredQueueName(queueId: QueueId) {
    if (queueId === "internal") {
        return chalk.cyan(queueIdToName[queueId]);
    }

    return chalk.magenta(queueIdToName[queueId]);
}

export function createQueueAdapter<T>(type: QueueId) {
    if (type === "internal") {
        const instance = new Queue<T>();
        return {
            enqueue: instance.enqueue.bind(instance),
            dequeue: instance.dequeue.bind(instance),
            instance,
            name: queueIdToName[type],
            id: type,
        };
    }

    const instance = new YoctoQueue<T>();
    return {
        enqueue: instance.enqueue.bind(instance),
        dequeue: instance.dequeue.bind(instance),
        instance,
        name: queueIdToName[type],
        id: type,
    };
}

export function prettyMetric(metric: Metric, value: number) {
    if (metric === "bytes") {
        return prettyBytes(value);
    }

    return prettyMs(value);
}
