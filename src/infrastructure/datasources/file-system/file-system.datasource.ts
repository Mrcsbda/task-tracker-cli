import * as fs from 'fs';
import { TaskDatasource } from "../../../domain/datasources/task.datasource";
import { DeleteTaskDto, UpdateTaskDescriptionDto } from '../../../domain/dtos';
import { AddTaskDto } from '../../../domain/dtos/add-task.dto';
import { UpdateTaskStatusDto } from '../../../domain/dtos/update-task-status.dto';
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

    addTask(dto: AddTaskDto): TaskEntity {
        const tasks = this.readTasks();
        const task = new TaskEntity({
            id: crypto.randomUUID(),
            description: dto.description
        })
        tasks.push(task);
        this.saveTasks(tasks);
        return task;
    }

    updateTask(dto: UpdateTaskStatusDto | UpdateTaskDescriptionDto): TaskEntity {
        const tasks = this.readTasks();
        const task = tasks.find(task => task.id === dto.id);

        if (!task) {
            throw new Error(`Task with ID ${dto.id} not found`);
        }

        if (dto instanceof UpdateTaskStatusDto) {
            task.status = dto.status;
        } else if (dto instanceof UpdateTaskDescriptionDto) {
            task.description = dto.description;
        }
        task.updatedAt = new Date();
        this.saveTasks(tasks);
        return task
    }

    deleteTask(dto: DeleteTaskDto): TaskEntity {
        const tasks = this.readTasks();
        const task = tasks.find(t => t.id === dto.id);

        if (!task) {
            throw new Error(`Task with ID ${dto.id} not found`);
        }

        const updatedTasks = tasks.filter((t) => t.id !== dto.id)
        this.saveTasks(updatedTasks);
        return task
    }
}