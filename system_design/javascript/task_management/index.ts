import Task from "./Task";
import TaskManagerService from "./TaskManagerService";
import User from "./User";

function main() {
   let userA = new User(1, "john", 'a@gmail.com');
   let userB = new User(1, "john", 'a@gmail.com');

   let task1 = new Task(1, "write", "write essay", Date.now(), 1, "Pending", userA);
   let task2 = new Task(2, "read", "read essay", Date.now(), 2, "Pending", userA);
   let task3 = new Task(3, "update", "update essay", Date.now(), 3, "Pending", userB);

   let taskManager = new TaskManagerService();

   taskManager.createTask(task1);
   taskManager.createTask(task2);
   taskManager.createTask(task3);

   task1.setDescription("updated descriptipn");
   task1.setAssignedTo(userB);

   taskManager.updateTask(task1);

   taskManager.searchTask('task');
}

main();