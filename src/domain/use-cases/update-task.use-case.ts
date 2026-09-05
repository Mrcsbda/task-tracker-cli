import { UpdateTaskDescriptionDto, UpdateTaskStatusDto } from "../dtos";
import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

interface IUpdateTaskUseCase {
    execute(dto: UpdateTaskStatusDto | UpdateTaskDescriptionDto): TaskEntity;
}

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    execute(dto: UpdateTaskStatusDto | UpdateTaskDescriptionDto): TaskEntity {
        const task = this.taskRepository.updateTask(dto)
        return task
    }
}