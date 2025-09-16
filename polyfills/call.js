Function.prototype.call = function(context, ...args) {
    context = context || globalThis;
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    const result =   context[fnSymbol](...args);
    delete fnSymbol[context];

    return result;
}