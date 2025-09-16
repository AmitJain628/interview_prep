/*
The Flyweight Design Pattern is a structural design pattern that optimizes memory usage by sharing as much data as possible between similar objects. It is particularly useful when dealing with large numbers of objects that have redundant or shared states, allowing you to minimize memory consumption and improve performance.


The Flyweight pattern is a memory optimization tool that:

Shares intrinsic states (e.g., textures, fonts).

Externalizes extrinsic states (e.g., positions, sizes).

Uses a factory to manage shared objects.

 Key Benefits
Memory Efficiency: Reduces redundancy by sharing intrinsic states.

Performance: Faster object creation and reduced garbage collection.

Scalability: Handles large numbers of objects without memory bloat.

 Key Benefits
Memory Efficiency: Reduces redundancy by sharing intrinsic states.

Performance: Faster object creation and reduced garbage collection.

Scalability: Handles large numbers of objects without memory bloat.
*/

class TreeType {
    constructor(name, color, texture) {
            this.name = name;
            this.texture = texture;
            this.color = color;
    }

    draw(x, y, size) {
        console.log(`Drawing ${this.name} tree at (${x}, ${y}) with size ${size}`);
    }
}

class TreeFactory {
    static treeTypes = new Map();

    static getTreeType(name, color, texture) {
        if (!this.treeTypes.has(name)) {
            this.treeTypes.set(name, new TreeType(name, color, texture));
        }
        return this.treeTypes.get(name);
    }

}

class Tree {
    constructor(x, y, size, type) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.type = type; // Shared flyweight object
    }
  
    draw() {
      this.type.draw(this.x, this.y, this.size);
    }
  }

const pineType = TreeFactory.getTreeType("Pine", "Green", "PineTexture");
const oakType = TreeFactory.getTreeType("Oak", "Brown", "OakTexture");

const trees = [];
for (let i = 0; i < 10000; i++) {
  const tree = new Tree(
    Math.random() * 1000, // x
    Math.random() * 1000, // y
    Math.random() * 10,   // size
    i % 2 === 0 ? pineType : oakType // Shared type
  );
  trees.push(tree);
}