class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
       this.observers.push(observer);
    }

    removeObserver(observer) {
       this.observers = this.observers.filter(obs => obs!== observer);
    }

    notifyObservers(data) {
       const scope = this;
       this.observers.forEach(obs => obs.call(scope, data));
    }
}

const moveHandler1 = function(item) {
   console.log("moveHandler1", item);
}

const moveHandler2 = function(item) {
    console.log("moveHandler2", item);
 }

 const subject = new Subject();
 subject.addObserver(moveHandler1);
 subject.addObserver(moveHandler2);

 subject.notifyObservers("item moved");
