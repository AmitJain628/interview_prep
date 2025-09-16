function A() {
    // if (this instanceof A && !this._constructed) {
    //     this._constructed = true;
    //     console.log("A was called using 'new'");
    // } else {
    //     console.log("A was called without 'new'");
    // }

    // only supported in Es6
    console.log("new", new.target)
    if (new.target) {
        console.log("A was called using 'new'");
    } else {
        console.log("A was called without 'new'");
    }
}

// const obj1 = new A();
// A();

var B = new A();
B.func1 = A;
B.func1();