function LIS(nums) {
    let temp = [];
    for (let num of nums) {
        let left = 0;
        let right = temp.length -1;

        while(left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (temp[mid] < num) {
                left = mid + 1;
            } else {
                right = mid -1;
            }
        }

        if (left === temp.length) {
            temp.push(num);
        } else {
            temp[left] = num;
        }
    }

    return temp.length;
}