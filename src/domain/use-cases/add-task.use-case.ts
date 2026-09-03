import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskEntity } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

interface IAddTaskUseCase {
    execute(dto: AddTaskDto): TaskEntity;
}

export class AddTaskUseCase implements IAddTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    execute(dto: AddTaskDto) {
        return this.taskRepository.add(dto)
    }
}