class MyClass {

    constructor(a, b, c, mutable = true) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.mutable = mutable
    }

    sum() {
        return this.a + this.b + this.c
    }

    getImmutableCopy() {
        let obj = new MyClass(this.a, this.b, this.c, )
        return Object.freeze(obj);
    }

    isMutable() {
       return this.mutable;
    }
}

const cl = MyClass(10, 12, 13, false)