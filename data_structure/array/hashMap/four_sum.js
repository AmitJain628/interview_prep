function fourSum(arr, target) {
  arr.sort((a, b) => a - b);
  let result = [];
  for(let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
          let left = j+1;
          let right = arr.length - 1;
          while(left < right) {
            let sum = arr[i] + arr[j] + arr[left] + arr[right];
            if (sum === target) {
                result.push([arr[i], arr[j], arr[left], arr[right]]);
                while(left < right && arr[left] === arr[left+1]) {
                    left++;
                }
                while(right > left && arr[right] === arr[right-1]) {
                    right--;
                }
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        while(j < arr.length - 1 && arr[j] === arr[j+1]) {
            j++;
        }
    }
    while(i < arr.length - 1 && arr[i] === arr[i+1]) {
        i++;
    }
  }
}