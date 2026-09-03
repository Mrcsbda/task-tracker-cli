import { TaskDatasource } from "../../../domain/datasources/task.datasource";
import { AddTaskDto } from "../../../domain/dtos/add-task.dto";
import { TaskEntity, TaskStatus } from "../../../domain/entities/task.entity";

export class FileSystemDatasource implements TaskDatasource {
    add(dto: AddTaskDto): TaskEntity {
        console.log("Adding task to file system:", dto);
        return new TaskEntity({ ...dto, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date(), status: TaskStatus.TODO });
    }

}