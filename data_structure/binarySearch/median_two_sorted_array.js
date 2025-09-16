//O(log(min(n,m)))
function mediaOfTwoSortedArray(nums1, nums2) {
   if(nums1.length > nums2.length) {
    return mediaOfTwoSortedArray(nums2, nums1);
   }

   let x = nums1.length;
   let y = nums2.length;
   let low = 0;
   let high = x;

   while(low <= high) {
      let partX = Math.floor((low + high)/2);
      let partY = (x + y + 1) / 2 - partX;

      let XLeft = partX == 0 ? Number.MIN_SAFE_INTEGER : nums1[partX -1];
      let XRight = partX == 0 ? Number.MAX_SAFE_INTEGER : nums1[partX];

      let YLeft = partY == 0 ? Number.MIN_SAFE_INTEGER : nums1[partY -1];
      let YRight = partY == 0 ? Number.MAX_SAFE_INTEGER : nums1[partY];

      if (XLeft <= YRight && XRight < YLeft) {
        if ((x + y) % 2 === 0) {
           return Math.floor((Math.max(XLeft, YLeft) + Math.min(XRight, YRight))/2);
        } else {
            return Math.max(XLeft, YLeft);
        }
      } else if(XLeft > YRight) {
            high = partX - 1;
      }  else {
           low = partX + 1;
      }
   }
}