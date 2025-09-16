import User from "./User";

export default class Task {
    private title: string;
    private description: string;
    private dueDate: number;
    private priority: number;
    private status: string;
    private assignedTo: User;
    private id: number;

    constructor(id: number, title: string, description: string, dueDate: number, priority: number, status: string, assignedTo: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.assignedTo = assignedTo;
    }

    // Getter for the task title
    getTitle(): string {
        return this.title;
    }

    // Setter for the task title
    setTitle(title: string): void {
        this.title = title;
    }

    // Getter for the task description
    getDescription(): string {
        return this.description;
    }

    // Setter for the task description
    setDescription(description: string): void {
        this.description = description;
    }

    // Getter for the due date
    getDueDate(): number {
        return this.dueDate;
    }

    // Setter for the due date
    setDueDate(dueDate: number): void {
        this.dueDate = dueDate;
    }

    // Getter for the priority
    getPriority(): number {
        return this.priority;
    }

    // Setter for the priority
    setPriority(priority: number): void {
        this.priority = priority;
    }

    // Getter for the status
    getStatus(): string {
        return this.status;
    }

    // Setter for the status
    setStatus(status: string): void {
        this.status = status;
    }

    // Getter for the assigned user
    getAssignedTo(): User {
        return this.assignedTo;
    }

    // Setter for the assigned user
    setAssignedTo(user: User): void {
        this.assignedTo = user;
    }

    // Getter for the task ID
    getId(): number {
        return this.id;
    }

    // Optionally, you can add a method to return all details as an object
    getTaskDetails() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            status: this.status,
            assignedTo: this.assignedTo,
        };
    }
}
