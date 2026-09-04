import { TaskEntity } from "../entities/task.entity";

export abstract class TaskDatasource {
    abstract addTask(task: TaskEntity): void;
}