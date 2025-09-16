Function.prototype.call = function(context, ...args) {

    let symbol = new Symbol();
    context[symbol] = this;
    let result = context[symbol](...args);

    delete context[symbol];

    return result;
}