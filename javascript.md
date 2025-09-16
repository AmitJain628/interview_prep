
JS: https://devinterview.io/questions/web-and-mobile-development/javascript-interview-questions/
Memory management: https://medium.com/@zlatkov/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec

Downloads/output.html
How this works https://www.youtube.com/watch?v=vZ1wfTExGNk
https://www.greatfrontend.com/blog/50-must-know-javascript-interview-questions-by-ex-interviewers
https://medium.com/@sohammehta56/javascript-interesting-output-based-interview-questions-38682c0b64fe
https://medium.com/@sohammehta56/javascript-interesting-output-based-interview-questions-38682c0b64fe
https://www.youtube.com/watch?v=ZvbzSrg0afE&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&index=2
https://sahilali.medium.com/most-important-javascript-theory-based-interview-questions-and-answer-8dc111f069f3
https://www.youtube.com/watch?v=9T4z98JcHR0


//this

function name() {
    "use strict"
    console.log(this)
} // undefined

function name() {
    console.log(this)
} // global object

const obj = {
  name: "Amit",
  getName:  function () {
    console.log(this);
  }
};
obj.getName(); // this point to object scope

const obj = {
  name: "Amit",
  getName:   () => {
    console.log(this);
  }
};
obj.getName(); // undefined this points to window object




//variables
// support hositing
// global
//var

// TDZ 
// block
//let 
// const
//
// var foo = 10 + '20'; => 1020
// var foo = '10' + 4 = 14
// var foo = '10' - 2 = 8
// var foo = '5' * '2' = 10
// var foo = '20' / '4'
// console.log(10 + '20' - true) // 1019


function foo() {
  console.log(a);
  let a = 10;
}
foo();


foo();
function foo() {
  console.log('Hello, world!');
}
var foo = function() {
  console.log('Goodbye, world!');
};
foo();

for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);

var x = 10;

function test() {
  var x = 20;
  console.log(x); // Which x is accessed here?
}

test();
console.log(x); // Which x is accessed here?

function outer() {
    let count = 0;
    for (let i = 1; i <= 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
    return function inner() {
        count++;
        console.log(count);
    }
}

let closureFunc = outer();
closureFunc(); // Output?


// Microtask -> Prmosise mutationObserver then catch 
// Macrotask -> setTimeout setInterval setTimeout

Promise.resolve().then(()=> console.log(1));

queueMicrotask(()=> console.log(2));

setTimeout(()=> console.log(3), 0);

console.log(4);

new Promise(() => console.log(5));

(async () => console.log(6))();

// 4 -> consolelog directly
// 5 -> because callback in the promise excute
// 6 -> execute immedidately
// 1
// 2
// 3

// Which of the following are not a microtask in Javascript.

//  A. setTimeout 
//  B. requestAnimationFrame
//  D. MouseMove event
//  E. fetch calls
//  D. then callbacks

//  setTimeout -> macrotask
//  then -> microtasl
//  mouseevent, requestAnimationFramer, fetch calls -> macrotasl

 // What be logged in console?


    function show() {
        console.log(typeof arguments, Array.isArray(arguments));
    }


    show();
    // object false

(async ()=> {
const asyncFunc = async () => "asyncFunc";
 const promise = new Promise(res => {
         console.log("promise");   
 }).then(()=> console.log("then"))   // promise executor executed synchronusly but we are not resolving it
 
 console.log("async bodyk");
 
 queueMicrotask(() => {
      console.log("queueMicrotask");
 });
 
 await Promise.all([asyncFunc(), promise]); // THis will never resolved
})();

console.log("sripts");    

//promise
// async body
//strips
//queuMicrotask
<!-- Promise executor runs immediately (synchronously).

Microtasks run after the current synchronous code, before the next macrotask.

Await pauses the async function until all promises resolve.

If a promise never resolves, the .then() attached to it never runs. -->

What will be logged in console?

const outerFunc = ()=> {
    let count = 0;
    return ()=> ++count;
}

const counter = outerFunc();
console.log(counter());
console.log(counter());

// 1
// 2



What will be logged in console?

function createCounter() {
    let globalCount = 0;

    function incrementCount() {
        let incrementValue = ++globalCount;
        return incrementValue;
    }

    return {incrementCount}
}

const counter = createCounter();

console.log(counter.incrementCount());
console.log(counter.incrementCount());
console.log(createCounter().incrementCount());

// 1
// 2 
// 1

<!-- createCounter() function call won't execute the returned function, it will simply return a function incrementCount

First incrementCount() call, increase the globalCount and return 1
Second incrementCount() call, increase the globalCount and return 2
createCounter() call creates a new instance, which as globalCount 0, and when we call incrementCount it will increment to 1 and return it. -->

What will be logged in console?

function createCounter(initialCount) {
    let count = initialCount;

    return function() {
        "use strict";
        count += 1;
        return count;
    }
}

const counter = createCounter(10);

counter();
counter();
console.log(counter());


// 13

function createUser(username) {
    return {name: username}
}

createUser('allahabadi.dev') === createUser('allahabadi.dev');

// false because it will create different object
//  Objects in JS works on references basis, here we are creating two separate objects, whose reference will be different.


<!-- Which statement is correct?

A - Hoisting is the process of moving funcitons and variables to the top of the File.
B - Variables declared with let and const are hoisted.
C - Variables declared with the var keyword are uninitialized
D - Hoisting occurs during the execution phase
E - import declarations are hoisted
Answer
A - False - No code is moved, hoisiting is simply a process where at compile time variables get assigned default value. B - True: Let and Const are also hoisted, but the fact is they don't get initialised unlike var, that's when we try to access them we get error, and this concept is called Temporal Dead Zone. C - False: Variable declared with var are initialised with undefined D - False: Hoisting occurs at compile phase E - True: All imports are hoisted. -->


<!-- What will be logged in console? -->

function myfavFruit(input) {
    switch(input) {
        case 'orange':
                const color = "orange";
                console.log(color);
                break;
        case 'lemon':
                const color = "lime";
                console.log(color);
                break;
        default:
                console.log('no color');
    }
}


myfavFruit("orange");

<!-- Answer
Syntax Error
    we can not have two variables with same name in a block scope, when variables are declared with const.
    
    To solve this: either use var or wrap case in curly braces
    
    Solution 1:
     -->


What will be logged in console?

function logThis() {
    console.log(this);
}

const obj = {
    logThis,
    logThis2() {
        return logThis();
    },
    logThis3() {
        return obj.logThis();
    }
}

obj.logThis(); // this -> obj
obj.logThis2(); // this -> window
obj.logThis3(); // this -> obj



Rule1:
If funciton is involed using new keyword
then this will pointed new create object

function Person() {
 console.log(this) // emppty
}

console.log(new Person())

function show() {
    console.log(this);
}

const obj = {
    name: 'js'
}

show.call(obj); 

if a function is invoked on a object, then this should be invoked object
const personObj = {
    name: 'react',
    show: function() {
        console.log(this)
    }
}

console.log(personObj.show()) // this point to person

if function is invoked on window, 
if it's a strict object them value undefined else object is defined



const object = {
    who: 'World',
    greet() {
        return Hello, ${this.who}!; // Fixed: ends with backtick
    },
    farewell: () => {
        return Goodbye, ${this.who}!; // Fixed: ends with backtick
    }
};

console.log(object.greet()); // Logs: "Hello, World!"
console.log(object.farewell()); // Logs: "Goodbye, undefined!"

<!-- greet()

It's a regular method (shorthand syntax for a function).

In regular methods, this refers to the object that called the method.

So this.who correctly resolves to 'World'.

console.log(object.greet()); // "Hello, World!"


farewell

It's an arrow function.

Arrow functions do not have their own this. They capture this from the surrounding scope at the time they are defined.

In your code, the surrounding scope is the top-level (module or global scope), where this is not the object but usually undefined (or window in browsers).

So this.who inside the arrow function is undefined -->

What will be logged in console?

const objA = {
    foo() {
        console.log(this)
    },
    bar:()=> console.log(this),
}

const objB = {
    foo: objA.foo,
    bar:()=> objA.bar(),
    baz() {objA.foo()}
}

objB.foo();
objB.bar();
objB.baz();

What will be logged in console?

const obj = {
    logThis() {
        console.log(this)
    },
    logThis2() {
        function logThisInner() {
            console.log(this);
        }

        return logThisInner.apply(this);
    }
}

const {logThis, logThis2} = obj;

logThis();
logThis2();
obj.logThis();
obj.logThis2();

creating a new User instance would create a new login function in memory eah timee?

True or False?

class User() {

    constructor(name) {
        this.name = name;
    }

    login() {
        // some code
    }
}

const usr1 = new User('X');
const usr2 = new User('Y');
Answer
 False
 
 login method will be added in prototype key.
 
 User.prototype, hence both Object will point to same instane of login.
   

Which statements are true about this code:

    constructor(name) {
        this.username = username;
        this.wagTail = ()=> {
            return 'Running Tail'
        }
    }

    bark() {
        return "Bhau bhau";
    }
}

const dog1 = new Dog("Sheru");
const dog2 = new Dog("moti");


Statements:

A - dog1.wagTail() === dog2.wagTail()
B - dog1.wagTail === dog2.wagTail
C - dog1.bark === dog2.bark
D - Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2);
E - dog1.constructor === dog2.constructor
Answer
 A - True
 B - False
 C - True
 D - True
 E - True
   

   What will be logged in console?

class Chamelon {
    constructor(color="green") {
        this.color = color;
    }

    static changeColor(newColor) {
        this.color = newColor;
        console.log(this.color);
    }
}

const liz = new Chamelon("green");
liz.changeColor("purple");
Answer
TypeError: app.js:13 Uncaught TypeError: liz.changeColor is not a function
at app.js:13:5

We can only access static method on Class itself, not its instances.
   