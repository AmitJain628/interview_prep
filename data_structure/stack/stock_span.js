
var StockSpanner = function() {
    this.stock = [];
    this.index = 0
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    while(this.stock.length && this.stock[this.stock.length - 1].val <= price) {
        this.stock.pop();
    }
    let result = this.stock.length === 0 ? this.index + 1 : this.index - this.stock[this.stock.length - 1].ind

    this.stock.push({
        val: price,
        ind: this.index
    });
    this.index++;

    return result;
};

/** 
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */