class TopFrequent {
    public int[] topFrequent(int[] nums, int k) {
       if (nums == k) {
         return nums;
       }

       HashMap<Integer, Integer> count = new HashMap<Integer, Integer>();
       for (int num: nums) {
        count.put(num, count.getOrDefault(num,0)+1);
       }

       PriorityQueue<Integer, Integer> queue = new PriorityQueue((
        (a, b) -> count.get(a) - count.get(b)
       ));

       for (int num: count.keySet()) {
               queue.add(num);
               if (queue.size() > k) {
                  queue.poll();
               }
       }

       int[] result = new int[k];

       for (int i=k-1; i>=0; i--) {
        top[i] = queue.poll();
       }

       return result;
    }
}