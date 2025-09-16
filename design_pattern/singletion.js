/*
defintion
Singleton pattern is a design pattern which restricts a class to instantiate its multiple objects. 
It is nothing but a way of defining a class. 
Class is defined in such a way that only one instance of the class is created in the complete execution
of a program or project. 

Usage:
Logging Service: For a logging service that needs to capture and centralize log entries across the entire application, a Singleton can ensure that there’s only one logging instance.
Managing Shared Resources: In scenarios where you need to manage shared resources like database connections, network connections, or thread pools, a Singleton can help coordinate and control access to these resources.
Service Classes: For services that should have a single instance, such as a data service, API service, or utility service, a Singleton pattern can provide a consistent interface.
Preventing Multiple Instantiations: When instantiating multiple instances of a class would cause issues or inefficiencies, a Singleton ensures that there is only one instance in the entire application.
Lazy Initialization: If the instantiation of an object is resource-intensive and you want to delay the creation until it is actually needed, a Singleton can provide lazy initialization.
Preventing Cloning: If you want to prevent the cloning of an object, which could lead to multiple instances, a Singleton can include logic to prohibit cloning.

Drawbacks:
Concurrency Issues: If not implemented carefully, Singletons can introduce concurrency issues in multi-threaded applications. You may need to use synchronization mechanisms, like locks or mutexes, to ensure safe access to the Singleton instance, which can add complexity to your code.
Singleton Pattern Overuse: Due to its convenience, developers might overuse the Singleton pattern, leading to an abundance of Singleton instances in an application. This can defeat the purpose of the pattern and result in increased memory usage.
Initialization Overhead: Lazy initialization, while often an advantage, can introduce some overhead when the Singleton instance is first accessed. If the initialization process is resource-intensive, it can affect the application’s startup time.
Difficulties in Debugging: Debugging a Singleton-based codebase can be challenging, especially when issues related to the Singleton’s state arise. It can be hard to trace the source of problems when multiple parts of the code may have modified the Singleton’s data.
Limited Dependency Injection: Using dependency injection and inversion of control becomes less straightforward when relying on Singleton instances. It may be challenging to inject alternative implementations or configurations because the Singleton instance is typically accessed globally.
*/

const Singleton = (function () {
    let instance;
    function createInstance() {
        return {
          message: "I am the only instance!",
          showMessage: function () {
            console.log(this.message);
          },
        };
      }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    }
})();

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();

console.log(obj1 === obj2); // true

