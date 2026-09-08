import { AddTaskDto } from '../../domain/dtos/add-task.dto';
import { DeleteTaskDto } from '../../domain/dtos/delete-task.dto';
import { ListTasksDto } from '../../domain/dtos/list-tasks.dto';
import { UpdateTaskStatusDto } from '../../domain/dtos/update-task-status.dto';
import { TaskStatus } from '../../domain/entities/task.entity';
import { buildTask, mockDatasource } from '../../test-support/mocks';
import { TaskRepositoryImplementation } from './task.repository.implementation';

describe('TaskRepositoryImplementation', () => {
    test('addTask delegates to the datasource', () => {
        const datasource = mockDatasource();
        const task = buildTask();
        datasource.addTask.mockReturnValue(task);

        const [_e, dto] = AddTaskDto.create({ description: 'buy bread' });
        const result = new TaskRepositoryImplementation(datasource).addTask(dto!);

        expect(datasource.addTask).toHaveBeenCalledWith(dto);
        expect(datasource.updateTask).not.toHaveBeenCalled();
        expect(result).toBe(task);
    });

    test('updateTask delegates to the datasource', () => {
        const datasource = mockDatasource();
        const task = buildTask({ status: TaskStatus.DONE });
        datasource.updateTask.mockReturnValue(task);

        const [_e, dto] = UpdateTaskStatusDto.create({ id: 'task-id', status: TaskStatus.DONE });
        const result = new TaskRepositoryImplementation(datasource).updateTask(dto!);

        expect(datasource.updateTask).toHaveBeenCalledWith(dto);
        expect(result).toBe(task);
    });

    test('deleteTask delegates to the datasource', () => {
        const datasource = mockDatasource();
        const task = buildTask();
        datasource.deleteTask.mockReturnValue(task);

        const [_e, dto] = DeleteTaskDto.create({ id: 'task-id' });
        const result = new TaskRepositoryImplementation(datasource).deleteTask(dto!);

        expect(datasource.deleteTask).toHaveBeenCalledWith(dto);
        expect(result).toBe(task);
    });

    test('listTasks delegates to the datasource, with and without a dto', () => {
        const datasource = mockDatasource();
        datasource.listTasks.mockReturnValue([]);
        const repository = new TaskRepositoryImplementation(datasource);

        repository.listTasks();
        expect(datasource.listTasks).toHaveBeenCalledWith(undefined);

        const [_e, dto] = ListTasksDto.create({ status: TaskStatus.TODO });
        repository.listTasks(dto!);
        expect(datasource.listTasks).toHaveBeenLastCalledWith(dto);
    });
});
