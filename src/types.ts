
export interface ITask {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    isComplete: boolean;
    priority: "high" | "medium" | "low";
    assignedTo?: string | null;
}

export interface IUser {
    id: string;
    name: string;
}