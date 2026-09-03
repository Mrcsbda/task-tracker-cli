import { TaskRepository } from "../domain/repository/task.repository";
import { AddTaskCommand } from "./commands/add-task.command";


export class CliApp {
    public static start(taskRepository: TaskRepository) {
        const [command, ...args] = process.argv.slice(2)

        switch (command) {
            case 'add':
                AddTaskCommand.execute(args[0], taskRepository)
                break
            default:
                throw new Error(`Unknown command: ${command}`)
        }
    }
}