import Note from "./Note";
import Product from "./Product";
import VendingMachine from "./VendingMachine";
import { VendingMachineState } from "./VendingMachineState";

export default class DispenseState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(private machine: VendingMachine) {
        this.vendingMachine = machine;
    }

    selectProduct(product: Product) {
        console.log("Please pick product first");

    }
    insertNote(note: Note) {
        console.log("Please pick product first");
    }
    dispenseProduct() {
        let product = this.vendingMachine.getSelectedProduct();
        this.vendingMachine.getInventory().updateQuantity(product, (this.vendingMachine.getInventory().getQuantity(product) ?? 0) - 1);
        this.vendingMachine.setCurrentState(this.machine.getDispenseState());
        console.log("Please pick product first");
    }
    returnChange() {
        console.log("Please pick product first");
    }
}