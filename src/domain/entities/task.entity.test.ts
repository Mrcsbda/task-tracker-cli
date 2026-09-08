import { TaskEntity, TaskStatus } from './task.entity';

describe('TaskEntity', () => {
    describe('constructor', () => {
        test('defaults the status to TODO when none is given', () => {
            const task = new TaskEntity({ id: '1', description: 'buy bread' });
            expect(task.status).toBe(TaskStatus.TODO);
        });

        test('defaults createdAt and updatedAt when none are given', () => {
            const task = new TaskEntity({ id: '1', description: 'buy bread' });
            expect(task.createdAt).toBeInstanceOf(Date);
            expect(task.updatedAt).toBeInstanceOf(Date);
        });

        test('keeps the values that are explicitly provided', () => {
            const createdAt = new Date('2026-01-01T10:00:00.000Z');
            const task = new TaskEntity({
                id: '1',
                description: 'buy bread',
                status: TaskStatus.DONE,
                createdAt,
                updatedAt: createdAt,
            });
            expect(task.status).toBe(TaskStatus.DONE);
            expect(task.createdAt).toEqual(createdAt);
        });
    });

    describe('getTasksFromJSON', () => {
        test('returns an empty array when the content is blank', () => {
            expect(TaskEntity.getTasksFromJSON('')).toEqual([]);
        });

        test('returns an empty array when the JSON is []', () => {
            expect(TaskEntity.getTasksFromJSON('[]')).toEqual([]);
        });

        test('parses the dates as Date objects, not strings', () => {
            const json = JSON.stringify([{
                id: '1',
                description: 'buy bread',
                status: 'todo',
                createdAt: '2026-01-01T10:00:00.000Z',
                updatedAt: '2026-01-02T10:00:00.000Z',
            }]);

            const [task] = TaskEntity.getTasksFromJSON(json);

            expect(task.createdAt).toBeInstanceOf(Date);
            expect(task.updatedAt).toBeInstanceOf(Date);
            expect(task.createdAt.toISOString()).toBe('2026-01-01T10:00:00.000Z');
        });

        test('keeps the stored status', () => {
            const json = JSON.stringify([{
                id: '1',
                description: 'buy bread',
                status: 'done',
                createdAt: '2026-01-01T10:00:00.000Z',
                updatedAt: '2026-01-01T10:00:00.000Z',
            }]);

            const [task] = TaskEntity.getTasksFromJSON(json);
            expect(task.status).toBe(TaskStatus.DONE);
        });

        test('returns TaskEntity instances', () => {
            const json = JSON.stringify([{
                id: '1',
                description: 'buy bread',
                status: 'todo',
                createdAt: '2026-01-01T10:00:00.000Z',
                updatedAt: '2026-01-01T10:00:00.000Z',
            }]);

            const [task] = TaskEntity.getTasksFromJSON(json);
            expect(task).toBeInstanceOf(TaskEntity);
        });
    });
});
