this.a.bind(this);
Function.prototype.bind = function(context) {
   let fn = this; 
  return function(...args) {
        fn.apply(context, [...args]);
  }
}