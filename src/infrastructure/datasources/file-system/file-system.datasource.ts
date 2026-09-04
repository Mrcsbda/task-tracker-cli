import * as fs from 'fs';
import { TaskDatasource } from "../../../domain/datasources/task.datasource";
import { TaskEntity } from "../../../domain/entities/task.entity";

export class FileSystemDatasource implements TaskDatasource {

    private readonly tasksPath: string = "tasks";
    private readonly taskFilePath: string = `${this.tasksPath}/tasks.json`;

    constructor() {
        this.createTaskFile();
    }

    private createTaskFile(): void {
        if (!fs.existsSync(this.tasksPath)) {
            fs.mkdirSync(this.tasksPath);
        }
        if (!fs.existsSync(this.taskFilePath)) {
            fs.writeFileSync(this.taskFilePath, JSON.stringify([]));
        }
    }

    private readTasks(): TaskEntity[] {
        const content = fs.readFileSync(this.taskFilePath, 'utf-8');

        return TaskEntity.getTasksFromJSON(content);
    }

    private saveTasks(tasks: TaskEntity[]): void {
        fs.writeFileSync(this.taskFilePath, JSON.stringify(tasks, null, 2));
    }

    addTask(task: TaskEntity) {
        const tasks = this.readTasks();
        tasks.push(task);
        this.saveTasks(tasks);
    }

}