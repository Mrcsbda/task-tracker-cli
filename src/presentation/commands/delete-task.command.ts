import { DeleteTaskDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { DeleteTaskUseCase } from "../../domain/use-cases/delete-task.use-case";

export class DeleteTaskCommand {
    static execute(id: string, taskRepository: TaskRepository) {
        const [error, dto] = DeleteTaskDto.create({ id })

        if (error) {
            console.error(error)
            process.exit(1)
        }

        const task = new DeleteTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task deleted successfully: "${task.description}", (ID: ${task.id})`);
    }
}