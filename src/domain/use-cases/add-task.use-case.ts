import { AddTaskDto } from "../dtos/add-task.dto";
import { TaskEntity, TaskStatus } from "../entities/task.entity";
import { TaskRepository } from "../repository/task.repository";

interface IAddTaskUseCase {
    execute(dto: AddTaskDto): TaskEntity;
}

export class AddTaskUseCase implements IAddTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    execute(dto: AddTaskDto): TaskEntity {
        const task = new TaskEntity({
            id: crypto.randomUUID(),
            description: dto.description,
            status: TaskStatus.TODO,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        this.taskRepository.addTask(task)
        return task
    }
}