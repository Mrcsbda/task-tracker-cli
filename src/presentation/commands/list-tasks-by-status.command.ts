import { ListTasksDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/task.repository";
import { ListTaskUseCase } from "../../domain/use-cases";
import { printError, renderTask } from "../helpers";

export class ListTasksByStatusCommand {
    static execute(status: string, taskRepository: TaskRepository) {
        const [error, dto] = ListTasksDto.create({ status })

        if (error) printError(error)

        const tasks = new ListTaskUseCase(taskRepository).execute(dto!)

        if (!tasks.length) {
            console.log(`you dont have any task with status in "${status}" yet`)
            return
        }

        tasks.forEach(t => console.log(renderTask(t)))
    }
}