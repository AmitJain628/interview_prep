class Merge {
    public static int[] merge(ListNode[] arr1) {
        Queue<Integer> queue = new PriorityQueue<Integer>((a, b) -> a - b);
        ListNode dummy = new ListNode(null);
        ListNode head = dummy;
        for (ListNode list: arr1) {
              while(list!= null) {
                queue.add(list.val);
                list = list.next;
              }
        }


        while(queue.size()) {
          int num = queue.poll();
          head.next = new ListNode(num);
          head = dummy.next;
        }

        return dummy.next;
    }
}