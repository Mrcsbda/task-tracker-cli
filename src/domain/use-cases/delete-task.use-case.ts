import { DeleteTaskDto } from "../dtos";
import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

interface IDeleteTaskUseCase {
    execute(dto: DeleteTaskDto): TaskEntity;
}

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    execute(dto: DeleteTaskDto): TaskEntity {
        const task = this.taskRepository.deleteTask(dto)
        return task
    }
}