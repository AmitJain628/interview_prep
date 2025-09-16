import Task from './Task';

export default class User {
    private id: number;
    private name: string;
    private email: string;
    private tasks: Task[];

    constructor(id: number, name: string, email: string) {
        this.id = id;    
        this.name = name;
        this.email = email;
        this.tasks = [];
    }

    // Getter for ID
    getId(): number {
        return this.id;
    }

    // Getter for Name
    getName(): string {
        return this.name;
    }

    // Setter for Name
    setName(name: string): void {
        this.name = name;
    }

    // Getter for Email
    getEmail(): string {
        return this.email;
    }

    // Setter for Email
    setEmail(email: string): void {
        this.email = email;
    }

    // Getter for Tasks
    getTasks(): Task[] {
        return this.tasks;
    }

    // Setter for Tasks (Replaces all tasks)
    setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    // Method to add a single task
    addTask(task: Task): void {
        this.tasks.push(task);
    }

    // Method to remove a task by ID
    removeTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.getId() !== taskId);
    }
}
