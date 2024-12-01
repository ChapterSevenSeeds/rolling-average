import os, { EOL } from "os";
import { primitivePerformance } from "./primitivePerformance";
import { objectPerformance } from "./objectPerformance";
import { primitiveMemory } from "./primitiveMemory";
import { objectMemory } from "./objectMemory";
import { coloredQueueName, prettyMetric, queueIds } from "./utils";
import { timeWindowMethodsPerformance } from "./timeWindowMethodsPerformance";
import _ from "lodash";
import chalk from "chalk";

const cpuName = os.cpus()[0]?.model ?? "No CPU info available!";
const benches = [
    primitivePerformance,
    objectPerformance,
    primitiveMemory,
    objectMemory,
    timeWindowMethodsPerformance,
];

console.log(chalk.bgBlue(`Starting benchmark on ${cpuName}. ${EOL}`));

(async () => {
    for (const bench of benches) {
        console.log(chalk.underline(bench.name));
        const results = await bench.run();
        console.log(chalk.yellow(
            `Number of items enqueued: ${results.itemCount.toLocaleString()}`
        ));

        if (
            results.type === "competitive, multiple runs" ||
            results.type === "competitive, single run"
        ) {
            for (const queueId of queueIds) {
                if (results.type === "competitive, multiple runs") {
                    console.log(
                        `${coloredQueueName(
                            queueId
                        )} run times: ${results.results[queueId]
                            .map((item) =>
                                chalk.green(prettyMetric(results.metric, item))
                            )
                            .join(", ")}`
                    );
                    console.log(
                        `${coloredQueueName(
                            queueId
                        )} average time: ${chalk.green(
                            prettyMetric(
                                results.metric,
                                _.mean(results.results[queueId])
                            )
                        )}`
                    );
                    console.log(
                        `${coloredQueueName(queueId)} total time: ${chalk.green(
                            prettyMetric(
                                results.metric,
                                _.sum(results.results[queueId])
                            )
                        )}`
                    );
                } else if (results.type === "competitive, single run") {
                    console.log(
                        `${coloredQueueName(queueId)}: ${chalk.green(
                            prettyMetric(
                                results.metric,
                                results.results[queueId]
                            )
                        )}`
                    );
                }
            }
        } else {
            console.log(
                `${results.label}: ${chalk.green(
                    prettyMetric(results.metric, results.results)
                )}`
            );
        }

        console.log();
    }
})();
