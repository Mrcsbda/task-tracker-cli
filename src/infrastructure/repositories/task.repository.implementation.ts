import { TaskDatasource } from "../../domain/datasources/task.datasource";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskRepository } from "../../domain/repository/task.repository";

export class TaskRepositoryImplementation implements TaskRepository {

    constructor(private readonly taskDatasource: TaskDatasource) { }

    addTask(task: TaskEntity): void {
        this.taskDatasource.addTask(task)
    }
}