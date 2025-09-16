function CustomNew(fn, ...args) {
    let obj = {};

    Object.setPrototypeOf(obj, fn.prototype);

    let result = fn.apply(obj, args)
    
    if (result)
      return result;

    return obj;
}