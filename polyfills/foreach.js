Array.prototype.forEach = function(callback) {
  let arr = this;
  for (let i=0; i<arr.length; i++) {
    callback(arr[i], i, this);
  }
}