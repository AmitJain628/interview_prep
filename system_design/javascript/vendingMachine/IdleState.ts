import Note from "./Note";
import Product from "./Product";
import VendingMachine from "./VendingMachine";
import { VendingMachineState } from "./VendingMachineState";

export default class IdleState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(private machine: VendingMachine) {
        this.vendingMachine = machine;
    }

    selectProduct(product: Product) {
       if (this.machine.getInventory().isAvailable(product)) {
         this.machine.setSelectedProduct(product);
         this.machine.setCurrentState(this.machine.getReadyState());
       }
    }
    insertNote(note: Note) {
      console.log("Please select a product first.");
    }
    dispenseProduct() {
        console.log("Please select a product first.");
    }
    returnChange() {
        console.log("Please select a product first.");
    }
}