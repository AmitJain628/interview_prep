/*

Input: n = 4, arr[] = {1, 2, 3, 3}, time[]= {1, 2, 3, 4}
Output: 5
Explanation:

You start from index 1, and pick arr[1] i.e. 1 in no time.
In 1 sec you move from index 1 to 2, and pick arr[2] i.e. 2, total time = 1.
In next 1 sec you move from index 2 to 3, and pick arr[3] i.e. 3, total time = 2.
In next 1 sec you move from index 3 to 4, and arr[4] is 3, which you have taken already at time 2, hence you need to wait for time[arr[i]] sec to again pick arr[i], time[arr[i]] = time[3] = 3, hence in 1 sec you moved from index 3 to 4, and waited for next 2 sec, and finally picked arr[4], total time = 5.
Input: n = 4, arr[] = {1, 2, 3, 4}, time[] = {1, 2, 3, 4}
Output: 3
Explanation: All the array elements are different hence, you do not have to wait for any arr[i] before picking it, hence the total time will be 3, which is the time required to traverse the array.
*/