import { AddTaskDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { AddTaskUseCase } from "../../domain/use-cases";
import { printError } from "../helpers";

export class AddTaskCommand {
    static execute(description: string, taskRepository: TaskRepository) {
        const [error, dto] = AddTaskDto.create({ description })

        if (error) printError(error)

        const task = new AddTaskUseCase(taskRepository).execute(dto!)

        console.log(`Task added successfully (ID: ${task.id})`);
    }
}