import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
    abstract add(dto: AddTaskDto): TaskEntity;
}