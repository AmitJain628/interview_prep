function countSmaller(nums) {
    const result = new Array(nums.length).fill(0);
    const indexedNums = nums.map((num, index) => ({ num, index }));

    function mergeSort(start, end) {
        if (end - start <= 1) return;

        const mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid, end);

        merge(start, mid, end);
    }

    function merge(start, mid, end) {
        const left = indexedNums.slice(start, mid);
        const right = indexedNums.slice(mid, end);

        let i = 0, j = 0, k = start, count = 0;

        while (i < left.length && j < right.length) {
            if (left[i].num <= right[j].num) {
                result[left[i].index] += count;
                indexedNums[k] = left[i];
                i++;
            } else {
                count++;
                indexedNums[k] = right[j];
                j++;
            }
            k++;
        }

        // Copy the remaining elements from left
        while (i < left.length) {
            result[left[i].index] += count;
            indexedNums[k] = left[i];
            i++;
            k++;
        }

        // Copy the remaining elements from right
        while (j < right.length) {
            indexedNums[k] = right[j];
            j++;
            k++;
        }
    }

    mergeSort(0, nums.length);
    return result;
}
