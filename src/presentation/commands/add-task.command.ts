import { AddTaskDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { AddTaskUseCase } from "../../domain/use-cases";

export class AddTaskCommand {
    static execute(description: string, taskRepository: TaskRepository) {
        const [error, dto] = AddTaskDto.create({ description })

        if (error) {
            console.error(error)
            process.exit(1)
        }

        const task = new AddTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task added successfully (ID: ${task.id})`);
    }
}