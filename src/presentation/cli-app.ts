import { TaskStatus } from "../domain/entities/task.entity";
import { TaskRepository } from "../domain/repository/task.repository";
import { AddTaskCommand, DeleteTaskCommand, UpdateTaskDescriptionCommand, UpdateTaskStatusCommand } from "./commands";

enum ECommands {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
    MARK_IN_PROGRESS = 'mark-in-progress',
    MARK_DONE = 'mark-done'
}

export class CliApp {
    public static start(taskRepository: TaskRepository) {
        const [command, ...args] = process.argv.slice(2)

        switch (command) {
            case ECommands.ADD:
                AddTaskCommand.execute(args.join(' '), taskRepository)
                break
            case ECommands.UPDATE: {
                const [id, ...description] = args
                UpdateTaskDescriptionCommand.execute(id, description.join(' '), taskRepository)
            }
                break
            case ECommands.DELETE: {
                const [id] = args
                DeleteTaskCommand.execute(id, taskRepository)
            }
                break
            case ECommands.MARK_IN_PROGRESS:
                {
                    const [id] = args
                    UpdateTaskStatusCommand.execute(id, TaskStatus.IN_PROGRESS, taskRepository)
                }
                break
            case ECommands.MARK_DONE:
                {
                    const [id] = args
                    UpdateTaskStatusCommand.execute(id, TaskStatus.DONE, taskRepository)
                }
                break
            default:
                console.error(`you must provide a valid command`)
                process.exit(1)
        }
    }
}