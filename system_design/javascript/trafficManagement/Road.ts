import TrafficSignal from "./TrafficSignal";

class Road {
    private id: string;
    private name: string;
    private trafficSignal: TrafficSignal;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    // Getter and Setter for id
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    // Getter and Setter for name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and Setter for trafficSignal
    public getTrafficSignal(): TrafficSignal {
        return this.trafficSignal;
    }

    public setTrafficSignal(trafficSignal: TrafficSignal): void {
        this.trafficSignal = trafficSignal;
    }
}

export default Road;
