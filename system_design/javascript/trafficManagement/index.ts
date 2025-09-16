import Road from "./Road";
import TrafficController from "./TrafficController";
import TrafficSignal from "./TrafficSignal";

function main() {
    let trafficController = new TrafficController();

  // Create roads
  let road1 = new Road("R1", "Main Street");
  let road2 = new Road("R2", "Broadway");
  let road3 = new Road("R3", "Park Avenue");
  let road4 = new Road("R4", "Elm Street");


  let trafficLight1 = new TrafficSignal(1, 6000, 3000, 9000);
  let trafficLight2 = new TrafficSignal(2, 6000, 3000, 9000);
  let trafficLight3 = new TrafficSignal(3, 6000, 3000, 9000);
  let trafficLight4 = new TrafficSignal(4, 6000, 3000, 9000);


  road1.setTrafficSignal(trafficLight1);
  road2.setTrafficSignal(trafficLight2);
  road3.setTrafficSignal(trafficLight3);
  road4.setTrafficSignal(trafficLight4);

  trafficController.addRoad(road1);
  trafficController.addRoad(road2);
  trafficController.addRoad(road3);
  trafficController.addRoad(road4);

  trafficController.startTrafficControl();
}