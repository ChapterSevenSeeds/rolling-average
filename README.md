# Rolling Average
### By Tyson Jones
A zero-dependency package that helps to calculate various types of numerical averages.

## Installation
`npm install rolling-average` or `pnpm install rolling-average`

## Usage
There are three average calculators that can be constructed with the `RollingAverageFactory` class.

### 1. Fixed Window - Calculates the average of a fixed number of samples
```ts
import { RollingAverageFactory } from "rolling-average";
const fixedWindow = RollingAverageFactory.fixedWindow(3);
fixedWindow.addSample(1);
fixedWindow.addSample(2);
fixedWindow.addSample(3);
fixedWindow.addSample(4);
console.log(fixedWindow.getAverage()); // Prints out 3
```
### 2. Time Window - Calculates the average of the samples added during a rolling time window specified in milliseconds.
```ts
import { RollingAverageFactory } from "rolling-average";
const fixedWindow = RollingAverageFactory.timeWindow(1000);
fixedWindow.addSample(1);
// Sleep for 200 ms
fixedWindow.addSample(2);
// Sleep for 200 ms
fixedWindow.addSample(3);
// Sleep for 200 ms
fixedWindow.addSample(4);
// Sleep for 600 ms
console.log(fixedWindow.getAverage()); // Prints out 3
```

### 3. Regular - Calculates the average of all samples.
```ts
import { RollingAverageFactory } from "rolling-average";
const fixedWindow = RollingAverageFactory.fixedWindow(3);
fixedWindow.addSample(1);
fixedWindow.addSample(2);
fixedWindow.addSample(3);
console.log(fixedWindow.getAverage()); // Prints out 2
```