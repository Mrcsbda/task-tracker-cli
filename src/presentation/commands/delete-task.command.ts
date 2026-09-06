import { DeleteTaskDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { DeleteTaskUseCase } from "../../domain/use-cases/delete-task.use-case";
import { printError } from "../helpers";

export class DeleteTaskCommand {
    static execute(id: string, taskRepository: TaskRepository) {
        const [error, dto] = DeleteTaskDto.create({ id })

        if (error) printError(error)

        const task = new DeleteTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task deleted successfully: "${task.description}", (ID: ${task.id})`);
    }
}