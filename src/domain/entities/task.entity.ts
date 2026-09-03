export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export interface TaskEntityOptions {
    id: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class TaskEntity {
    public id: string;
    public description: string;
    public status: TaskStatus;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(options: TaskEntityOptions) {
        const { id, description, status, createdAt = new Date(), updatedAt = new Date() } = options;
        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static getTaskFromJSON(json: string): TaskEntity {
        json = !json.trim() ? '{}' : json;
        const { id, description, status, createdAt, updatedAt } = JSON.parse(json)

        const task = new TaskEntity({
            id,
            description,
            status,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt)
        });

        return task;
    }

}