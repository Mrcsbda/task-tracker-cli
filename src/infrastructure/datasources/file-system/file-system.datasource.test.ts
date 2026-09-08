import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { AddTaskDto } from '../../../domain/dtos/add-task.dto';
import { DeleteTaskDto } from '../../../domain/dtos/delete-task.dto';
import { ListTasksDto } from '../../../domain/dtos/list-tasks.dto';
import { UpdateTaskDescriptionDto } from '../../../domain/dtos/update-task-description.dto';
import { UpdateTaskStatusDto } from '../../../domain/dtos/update-task-status.dto';
import { TaskStatus } from '../../../domain/entities/task.entity';
import { FileSystemDatasource } from './file-system.datasource';

let tmpDir: string;
let datasource: FileSystemDatasource;

const addTask = (description: string) => {
    const [_e, dto] = AddTaskDto.create({ description });
    return datasource.addTask(dto!);
};

beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'task-tracker-test-'));
    datasource = new FileSystemDatasource(path.join(tmpDir, 'tasks'));
});

afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe('FileSystemDatasource', () => {
    describe('file creation', () => {
        test('creates the directory and the json file when they do not exist', () => {
            const filePath = path.join(tmpDir, 'tasks', 'tasks.json');
            expect(fs.existsSync(filePath)).toBe(true);
            expect(fs.readFileSync(filePath, 'utf-8')).toBe('[]');
        });

        test('does not overwrite an existing file', () => {
            const created = addTask('buy bread');
            new FileSystemDatasource(path.join(tmpDir, 'tasks'));
            expect(datasource.listTasks()).toHaveLength(1);
            expect(datasource.listTasks()[0].id).toBe(created.id);
        });
    });

    describe('addTask', () => {
        test('persists the task to disk', () => {
            const task = addTask('buy bread');
            const stored = JSON.parse(fs.readFileSync(path.join(tmpDir, 'tasks', 'tasks.json'), 'utf-8'));

            expect(stored).toHaveLength(1);
            expect(stored[0].id).toBe(task.id);
            expect(stored[0].description).toBe('buy bread');
        });

        test('starts every new task as todo', () => {
            expect(addTask('buy bread').status).toBe(TaskStatus.TODO);
        });

        test('gives each task a different id', () => {
            expect(addTask('buy bread').id).not.toBe(addTask('call the bank').id);
        });

        test('appends without dropping the previous tasks', () => {
            addTask('buy bread');
            addTask('call the bank');
            expect(datasource.listTasks()).toHaveLength(2);
        });
    });

    describe('updateTask', () => {
        test('changes the description', () => {
            const task = addTask('buy bread');
            const [_e, dto] = UpdateTaskDescriptionDto.create({ id: task.id, description: 'buy wholemeal bread' });

            const updated = datasource.updateTask(dto!);

            expect(updated.description).toBe('buy wholemeal bread');
            expect(datasource.listTasks()[0].description).toBe('buy wholemeal bread');
        });

        test('changes the status', () => {
            const task = addTask('buy bread');
            const [, dto] = UpdateTaskStatusDto.create({ id: task.id, status: TaskStatus.DONE });

            expect(datasource.updateTask(dto!).status).toBe(TaskStatus.DONE);
            expect(datasource.listTasks()[0].status).toBe(TaskStatus.DONE);
        });

        test('leaves the description untouched when only the status changes', () => {
            const task = addTask('buy bread');
            const [, dto] = UpdateTaskStatusDto.create({ id: task.id, status: TaskStatus.DONE });

            expect(datasource.updateTask(dto!).description).toBe('buy bread');
        });

        test('throws when the id does not exist', () => {
            const [, dto] = UpdateTaskStatusDto.create({ id: 'missing-id', status: TaskStatus.DONE });
            expect(() => datasource.updateTask(dto!)).toThrow('Task with ID missing-id not found');
        });
    });

    describe('deleteTask', () => {
        test('removes the task from disk and returns it', () => {
            const task = addTask('buy bread');
            addTask('call the bank');

            const deleted = datasource.deleteTask(DeleteTaskDto.create({ id: task.id })[1]!);

            expect(deleted.description).toBe('buy bread');
            expect(datasource.listTasks()).toHaveLength(1);
            expect(datasource.listTasks()[0].description).toBe('call the bank');
        });

        test('throws when the id does not exist', () => {
            const [, dto] = DeleteTaskDto.create({ id: 'missing-id' });
            expect(() => datasource.deleteTask(dto!)).toThrow('Task with ID missing-id not found');
        });
    });

    describe('listTasks', () => {
        test('returns an empty array when there are no tasks', () => {
            expect(datasource.listTasks()).toEqual([]);
        });

        test('returns every task when no dto is given', () => {
            addTask('buy bread');
            addTask('call the bank');
            expect(datasource.listTasks()).toHaveLength(2);
        });

        test('filters by status when a dto is given', () => {
            const first = addTask('buy bread');
            addTask('call the bank');

            const [_e, statusDto] = UpdateTaskStatusDto.create({ id: first.id, status: TaskStatus.DONE });
            datasource.updateTask(statusDto!);

            const [_edone, doneDto] = ListTasksDto.create({ status: TaskStatus.DONE });
            const [_etodo, todoDto] = ListTasksDto.create({ status: TaskStatus.TODO });

            expect(datasource.listTasks(doneDto!).map(t => t.description)).toEqual(['buy bread']);
            expect(datasource.listTasks(todoDto!).map(t => t.description)).toEqual(['call the bank']);
        });

        test('returns an empty array when no task matches the status', () => {
            addTask('buy bread');
            const [_e, dto] = ListTasksDto.create({ status: TaskStatus.DONE });
            expect(datasource.listTasks(dto!)).toEqual([]);
        });
    });
});
