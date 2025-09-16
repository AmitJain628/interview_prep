import DispenseState from "./DispenseState";
import IdleState from "./IdleState";
import Inventory from "./Inventory";
import Note from "./Note";
import Product from "./Product";
import ReadyState from "./ReadyState";
import { VendingMachineState } from "./VendingMachineState";

export default class VendingMachine {
    private static instance: VendingMachine;
    private idleState: VendingMachineState;
    private inventory: Inventory;
    private product: Product | null;
    private totalPayment: number;
    private currentState: VendingMachineState;
    private dispenseState: VendingMachineState;
    private returnChangeState: VendingMachineState;
    private readyState: VendingMachineState;

    constructor() {
    this.inventory = new Inventory();
    this.idleState = new IdleState(this);
    this.readyState = new ReadyState(this);
    this.dispenseState = new DispenseState(this);
    this.product = null;
    this.currentState = this.idleState;
    this.totalPayment = 0;
    }

    public static getInstance(): VendingMachine {
        if (!VendingMachine.instance) {
          VendingMachine.instance = new VendingMachine();
        }
        return VendingMachine.instance;
      }

      public getInventory() {
        return this.inventory;
      }

      public setSelectedProduct(product: Product | null)  {
        this.product = product;
      }

      public addPayment(note: Note) {
        this.totalPayment += note.getValue();
      }

      public getTotalPayment() {
        return this.totalPayment;
      }

      public getSelectedProduct() {
        return this.product;
      }

      public setCurrentState(state: VendingMachineState) {
        this.currentState = state;
      }

      getReadyState(): VendingMachineState {
        return this.readyState;
      }
    
      getDispenseState(): VendingMachineState {
        return this.dispenseState;
      }

      public void selectProduct(Product product) {
        currentState.selectProduct(product);
    }

    public void insertCoin(Coin coin) {
        currentState.insertCoin(coin);
    }

    public void insertNote(Note note) {
        currentState.insertNote(note);
    }

    public void dispenseProduct() {
        currentState.dispenseProduct();
    }
    
}