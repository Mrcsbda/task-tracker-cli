import { ListTasksDto } from "../dtos";
import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

interface IListTaskUseCase {
    execute(dto?: ListTasksDto): TaskEntity[];
}

export class ListTaskUseCase implements IListTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    execute(dto?: ListTasksDto): TaskEntity[]{
        return this.taskRepository.listTasks(dto)
    }
}