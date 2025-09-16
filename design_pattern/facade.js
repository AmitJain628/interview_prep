/*
The Factory Design Pattern in JavaScript is a creational pattern that provides a way to create objects without specifying the exact class of object that will be created. Instead, it defines a method for creating the objects, which allows for flexibility and scalability. The pattern promotes loose coupling by reducing the dependency between the client code and the specific classes it needs to instantiate. This is particularly useful when dealing with complex object creation logic or when you want to ensure that certain invariants are maintained during object creation

Type: Structural design pattern.

Purpose: Simplifies interaction with a complex system by providing a unified, high-level interface.
*/

class Lights {
    turnOn() {
      console.log("Lights are turned ON");
    }
    turnOff() {
      console.log("Lights are turned OFF");
    }
  }
  
  class AirConditioner {
    setTemperature(temp) {
      console.log(`Air conditioner temperature set to ${temp}°C`);
    }
  }
  
  class MusicPlayer {
    play(song) {
      console.log(`Playing song: ${song}`);
    }
  }
 
  
  class SmartHome {
    constructor() {
          this.lights = new Lights();
          this.airConditioner = new AirConditioner();
          this.musicPlayer = new MusicPlayer();
    }

    startPlayMode() {
        this.lights.turnOn();
        this.airConditioner.setTemperature(22);
        this.musicPlayer.play("Party All Night");
    }
    turnOffEverything() {
        console.log("Shutting down all systems...");
        this.lights.turnOff();
        console.log("Air conditioner OFF");
        console.log("Music stopped");
      }
  }

const smartHome = new SmartHomeFacade();
smartHome.startPartyMode(); // Simplified interface
smartHome.turnOffEverything();