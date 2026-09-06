import { UpdateTaskDescriptionDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { UpdateTaskUseCase } from "../../domain/use-cases";
import { printError } from "../helpers";

export class UpdateTaskDescriptionCommand {
    static execute(id: string, description: string, taskRepository: TaskRepository) {
        const [error, dto] = UpdateTaskDescriptionDto.create({ id, description })

        if (error) printError(error)

        const task = new UpdateTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task updated successfully (ID: ${task.id})`);
    }
}