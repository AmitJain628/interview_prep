import Note from "./Note";
import Product from "./Product";

export interface VendingMachineState {
    selectProduct(product: Product): void;
    insertNote(note: Note): void;
    dispenseProduct(): void;
    returnChange(): void;
}