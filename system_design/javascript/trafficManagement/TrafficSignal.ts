import { SIGNAL } from "./signal";

class TrafficSignal {
    private id: number;
    private currentSignal: SIGNAL;
    private redDuration: number;
    private greenDuration: number;
    private yellowDuration: number;

    constructor(id: number, redDuration: number, greenDuration: number, yellowDuration: number) {
        this.id = id;
        this.redDuration = redDuration;
        this.greenDuration = greenDuration;
        this.yellowDuration = yellowDuration;
    }

    // Getter and Setter for id
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    // Getter and Setter for currentSignal
    public getCurrentSignal(): SIGNAL {
        return this.currentSignal;
    }

    public setCurrentSignal(signal: SIGNAL): void {
        this.currentSignal = signal;
    }

    // Getter and Setter for redDuration
    public getRedDuration(): number {
        return this.redDuration;
    }

    public setRedDuration(duration: number): void {
        this.redDuration = duration;
    }

    // Getter and Setter for greenDuration
    public getGreenDuration(): number {
        return this.greenDuration;
    }

    public setGreenDuration(duration: number): void {
        this.greenDuration = duration;
    }

    // Getter and Setter for yellowDuration
    public getYellowDuration(): number {
        return this.yellowDuration;
    }

    public setYellowDuration(duration: number): void {
        this.yellowDuration = duration;
    }
}

export default TrafficSignal;
