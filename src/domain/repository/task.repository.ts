import { DeleteTaskDto, ListTasksDto, UpdateTaskDescriptionDto, UpdateTaskStatusDto } from "../dtos";
import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskEntity } from "../entities/task.entity";

export abstract class TaskRepository {
    abstract addTask(dto: AddTaskDto): TaskEntity;
    abstract updateTask(dto: UpdateTaskStatusDto | UpdateTaskDescriptionDto): TaskEntity;
    abstract deleteTask(dto: DeleteTaskDto): TaskEntity
    abstract listTasks(dto?: ListTasksDto): TaskEntity[]
}