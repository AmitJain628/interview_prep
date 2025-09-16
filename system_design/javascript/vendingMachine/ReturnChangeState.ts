import Note from "./Note";
import Product from "./Product";
import VendingMachine from "./VendingMachine";
import { VendingMachineState } from "./VendingMachineState";

export default class ReturnChangeState implements VendingMachineState {
    private vendingMachine: VendingMachine;

    constructor(private machine: VendingMachine) {
        this.vendingMachine = machine;
    }

    selectProduct(product: Product) {
        console.log("Please collect return");

    }
    insertNote(note: Note) {
        console.log("Please collect return");   }
    dispenseProduct() {
        console.log("Please collect return");    }
    returnChange() {
        if(this.vendingMachine.getTotalPayment() > (this.vendingMachine.getSelectedProduct()?.getPrice() || 0)) {
            let change = this.vendingMachine.getTotalPayment() - (this.vendingMachine.getSelectedProduct()?.getPrice() || 0);
            this.vendingMachine.setSelectedProduct(null);
            // this.vendingMachine.addPayment(0);
        }
    }
}