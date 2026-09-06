import { TaskEntity } from "../../domain/entities/task.entity";

export const renderTask = (task: TaskEntity) => {
    const fmt = (d: Date) => d.toLocaleString('sv-SE').slice(0, 16);

    return `id:${task.id} createdAt: ${fmt(task.createdAt)} updatedAt: ${fmt(task.updatedAt)} status:${task.status} description: ${task.description}`
}