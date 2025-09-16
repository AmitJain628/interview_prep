export default class Product {
    private name: string;
    private price: number;
    private description: string;
    private id: number;

    constructor(id, name, price, descritpion) {
        this.id = id;
        this.description = descritpion;
        this.name = name;
        this.price = price;
    }

    getPrice(){
        return this.price;
    }
}