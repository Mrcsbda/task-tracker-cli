import { TaskDatasource } from "../../domain/datasources/task.datasource";
import { DeleteTaskDto, ListTasksDto, UpdateTaskDescriptionDto, UpdateTaskStatusDto } from "../../domain/dtos";
import { AddTaskDto } from "../../domain/dtos/add-task.dto";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskRepository } from "../../domain/repository/task.repository";

export class TaskRepositoryImplementation implements TaskRepository {

    constructor(private readonly taskDatasource: TaskDatasource) { }

    addTask(dto: AddTaskDto): TaskEntity {
        return this.taskDatasource.addTask(dto);
    }

    updateTask(dto: UpdateTaskStatusDto | UpdateTaskDescriptionDto): TaskEntity {
        return this.taskDatasource.updateTask(dto);
    }

    deleteTask(dto: DeleteTaskDto): TaskEntity {
        return this.taskDatasource.deleteTask(dto)
    }

    listTasks(dto?: ListTasksDto): TaskEntity[] {
        return this.taskDatasource.listTasks(dto)
    }
}