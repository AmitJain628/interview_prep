import Product from "./Product";

export default class Inventory {
   private products: Map<string, { product: Product; quantity: number }>;

   constructor() {
    this.products = new Map();
   }

   addProduct(product, quantity) {
    this.products.set(product.getId(), {product: product, quantity: quantity});
   }

   removeProduct(product) {
    this.products.delete(product.getId());
   }

   updateQuantity(product, quantity) {
     this.products.set(product.getId(), {product: product, quantity:quantity})
   } 

   getQuantity(product) {
     const prod = this.products.get(product.getId());
     return prod?.quantity;
   }

   isAvailable(product) {
    const prod = this.products.get(product.getId());
    return (prod?.quantity || 0) > 0;
   }


}