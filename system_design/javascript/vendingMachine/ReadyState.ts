import Note from "./Note";
import Product from "./Product";
import VendingMachine from "./VendingMachine";
import { VendingMachineState } from "./VendingMachineState";

export default class ReadyState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(private machine: VendingMachine) {
        this.vendingMachine = machine;
    }

    selectProduct(product: Product) {
        console.log("Please make payment first");

    }
    insertNote(note: Note) {
        this.vendingMachine.addPayment(note);
        if(this.vendingMachine.getTotalPayment() >= (this.vendingMachine.getSelectedProduct()?.getPrice() || 0)) {
          this.vendingMachine.setCurrentState(this.vendingMachine.getDispenseState());
        }
    }
    dispenseProduct() {
        console.log("Please make payment first");
    }
    returnChange() {
        console.log("Please make payment first");
    }
}