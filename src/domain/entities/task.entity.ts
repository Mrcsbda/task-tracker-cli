export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export interface TaskEntityOptions {
    id: string;
    description: string;
    status?: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TaskEntity {
    public id: string;
    public description: string;
    public status: TaskStatus;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(options: TaskEntityOptions) {
        const {
            id,
            description,
            status = TaskStatus.TODO,
            createdAt = new Date(),
            updatedAt = new Date()
        } = options;

        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static getTasksFromJSON(json: string): TaskEntity[] {
        json = !json.trim() ? '[]' : json;

        const tasks = JSON.parse(json).map((obj: any) => new TaskEntity({
            ...obj,
            createdAt: new Date(obj.createdAt),
            updatedAt: new Date(obj.updatedAt),
        }));

        return tasks;
    }

}