import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskDatasource {
    abstract addTask(dto: AddTaskDto): TaskEntity;
}