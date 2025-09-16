import Road from "./Road";
import { SIGNAL } from "./signal";

class TrafficController {
    private static instance: TrafficController;
    private roads: Map<string, Road>;
    constructor() {
        if(TrafficController.instance) {
            return TrafficController.instance
        }

        TrafficController.instance = this;
        this.roads = new Map();
    }

    addRoad(road: Road) {
        this.roads[road.getId()] = road;
    }

    startTrafficControl() {
        for (let [id, road] of this.roads) {
            let signal = road.getTrafficSignal();
            
            const controllTrafic = async () => {
                while(true) {
                   await this.delay(signal.getRedDuration());
                   signal.setCurrentSignal(SIGNAL.GREEN);

                   await this.delay(signal.getGreenDuration());
                   signal.setCurrentSignal(SIGNAL.YELLOW);

                   await this.delay(signal.getYellowDuration());
                   signal.setCurrentSignal(SIGNAL.RED);
                }
            }

            controllTrafic();
        }

    }

    emergency(road: Road) {
        let existingRoad = this.roads.get(road.getId());
        existingRoad?.getTrafficSignal().setCurrentSignal(SIGNAL.GREEN);

    }

   private delay(time: number) {
        return new Promise((resolve, reject) => setTimeout(resolve, time))
    }
}

export default TrafficController;