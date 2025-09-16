import Task from "./Task";
import User from "./User";

export default class TaskManagerService {
    private tasks: Map<number, Task>;
    private users: Map<number, Task[]>;
    private static instance: TaskManagerService
    constructor() {
        if(TaskManagerService.instance) {
            return TaskManagerService.instance;
        }
        TaskManagerService.instance = this;
        this.tasks = new Map();
        this.users = new Map();
    }

    createTask(task: Task) {
        if(!this.tasks.get(task.getId())) {
           this.tasks.set(task.getId(), task);
           this.assignedToUser(task.getAssignedTo(), task);
        }
    }

    assignedToUser(user: User, task: Task) {
        if(!this.users.get(user.getId())) {
            this.users.set(user.getId(), []);
        }
        this.users.get(user.getId())?.push(task);
    }

    unAssignedToUser(user: User, task: Task) {
        let taskList = this.users.get(user.getId());
        let updatedtaskList = taskList?.filter(existingTask => existingTask.getId() != task.getId()) || [];
        this.users.set(user.getId(), updatedtaskList);
    }

    updateTask(task: Task) {
        if(!this.tasks.get(task.getId())) {
           this.tasks.set(task.getId(), task);
        }

        let existingTask = this.tasks.get(task.getId());
        if(!existingTask) return;
        existingTask?.setAssignedTo(task.getAssignedTo());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setTitle(task.getTitle());

        if(task.getAssignedTo().getId() != existingTask.getAssignedTo().getId()) {
            this.unAssignedToUser(task.getAssignedTo(), task);
            this.assignedToUser(task.getAssignedTo(), task);
        }
    }

    searchTask(search: string) {
        let results: Task[] = []
        for(let [id, task] of this.tasks) {
            if(task.getDescription().toLowerCase().includes(search.toLocaleLowerCase()) || task.getTitle().toLowerCase().includes(search.toLocaleLowerCase())) {
                results.push(task);
            }
        }

        return results;
    }


    fiterTask(priority: number, status: string, userId: number, dueDate: number) {
        let results: Task[] = []
        for(let [id, task] of this.tasks) {
            if(task.getPriority() === priority || task.getStatus() === status || task.getDueDate() < dueDate || task.getAssignedTo().getId() === userId) {
                results.push(task);
            }
        }

        return results;
    }

    deleteTask(task: Task) {
        delete this.tasks[task.getId()];
        this.unAssignedToUser(task.getAssignedTo(), task);
    }
} 