/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(nums, k) {
    let stack = [];
  
    for(let i=0; i<nums.length; i++) {
      while(stack.length !== 0 && k > 0 && stack[stack.length - 1] > nums[i]) {
          stack.pop();
          k--
      }
  
      stack.push(nums[i]);
    }
  
      while(k>0){
          stack.pop();
          k--
      }
  
      let result = stack.join('');
       result = result.replace(/^0+/, '');
      return result.length === 0 ? "0" : result;
  };