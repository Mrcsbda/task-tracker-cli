import { TaskDatasource } from '../domain/datasources/task.datasource';
import { TaskEntity, TaskStatus } from '../domain/entities/task.entity';
import { TaskRepository } from '../domain/repository/task.repository';

export const buildTask = (overrides: Partial<TaskEntity> = {}): TaskEntity =>
    new TaskEntity({
        id: 'task-id',
        description: 'buy bread',
        status: TaskStatus.TODO,
        createdAt: new Date('2026-01-01T10:00:00.000Z'),
        updatedAt: new Date('2026-01-01T10:00:00.000Z'),
        ...overrides,
    });

export const mockRepository = (): jest.Mocked<TaskRepository> => ({
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    listTasks: jest.fn(),
});

export const mockDatasource = (): jest.Mocked<TaskDatasource> => ({
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    listTasks: jest.fn(),
});
