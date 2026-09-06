import { TaskRepository } from "../../domain/repository/task.repository";
import { ListTaskUseCase } from "../../domain/use-cases";
import { renderTask } from "../helpers";

export class ListAllTasksCommand {
    static execute(taskRepository: TaskRepository) {
        const tasks = new ListTaskUseCase(taskRepository).execute()

        if (!tasks.length) {
            console.log('you dont have any task yet')
            return
        }

        tasks.forEach(t => console.log(renderTask(t)))
    }
}