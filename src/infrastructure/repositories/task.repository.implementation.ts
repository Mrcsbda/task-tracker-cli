import { TaskDatasource } from "../../domain/datasources/task.datasource";
import { AddTaskDto } from "../../domain/dtos/add-task.dto";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskRepository } from "../../domain/repository/task.repository";

export class TaskRepositoryImplementation implements TaskRepository {

    constructor(private readonly taskDatasource: TaskDatasource) { }

    add(dto: AddTaskDto): TaskEntity {
        return this.taskDatasource.add(dto)
    }
}