import { TaskRepository } from "../domain/repository/task.repository";
import { AddTaskCommand, DeleteTaskCommand, UpdateTaskDescriptionCommand } from "./commands";


export class CliApp {
    public static start(taskRepository: TaskRepository) {
        const [command, ...args] = process.argv.slice(2)

        switch (command) {
            case 'add':
                AddTaskCommand.execute(args.join(' '), taskRepository)
                break
            case 'update': {
                const [id, ...description] = args
                UpdateTaskDescriptionCommand.execute(id, description.join(' '), taskRepository)
            }
                break
            case 'delete': {
                const [id] = args
                DeleteTaskCommand.execute(id, taskRepository)
            }
                break
            default:
                console.error(`you must provide a valid command`)
                process.exit(1)
        }
    }
}