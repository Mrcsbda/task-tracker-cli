import { UpdateTaskStatusDto } from "../../domain/dtos";
import { TaskStatus } from "../../domain/entities/task.entity";
import { TaskRepository } from "../../domain/repository/task.repository";
import { UpdateTaskUseCase } from "../../domain/use-cases";
import { printError } from "../helpers";

export class UpdateTaskStatusCommand {
    static execute(id: string, status: TaskStatus, taskRepository: TaskRepository) {
        const [error, dto] = UpdateTaskStatusDto.create({ id, status })

        if (error) printError(error)

        const task = new UpdateTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task updated successfully (ID: ${task.id})`);
    }
}