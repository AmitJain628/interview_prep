function gasStation(gas, cost) {
    let totalGas = 0;
    let current = 0;
    let start = 0;

    for(let i = 0; i < gas.length; i++) {
        let diff = gas[i] - cost[i];
        totalGas += diff;
        current += diff;

        if (current < 0) {
            current = 0;
            start = i + 1;
        }
    }

    return totalGas >= 0? start : -1;
}