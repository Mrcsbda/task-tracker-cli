import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
    abstract addTask(task: TaskEntity): void;
}