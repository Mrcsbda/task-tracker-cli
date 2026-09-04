import { TaskRepository } from "../domain/repository/task.repository";
import { AddTaskCommand } from "./commands/add-task.command";


export class CliApp {
    public static start(taskRepository: TaskRepository) {
        const [command, ...args] = process.argv.slice(2)

        switch (command) {
            case 'add':
                AddTaskCommand.execute(args.join(' '), taskRepository)
                break
            default:
                console.error(`Unknown command: ${command}`)
                process.exit(1)
        }
    }
}