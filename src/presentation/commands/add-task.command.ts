import { AddTaskDto } from "../../domain/dtos/add-task.dto";
import { TaskRepository } from "../../domain/repository/task.repository";
import { AddTaskUseCase } from "../../domain/use-cases/add-task.use-case";


export class AddTaskCommand {
    static execute(description: string, taskRepository: TaskRepository) {
        const [error, dto] = AddTaskDto.create({ description })
        if (error) throw new Error(error)

        const task = new AddTaskUseCase(taskRepository).execute(dto!);
        console.log(`Task added successfully (ID: ${task.id})`);
    }
}