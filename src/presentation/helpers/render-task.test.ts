import { TaskStatus } from '../../domain/entities/task.entity';
import { buildTask } from '../../test-support/mocks';
import { renderTask } from './render-task';

describe('renderTask', () => {
    const task = buildTask({
        id: 'abc-123',
        description: 'buy bread',
        status: TaskStatus.IN_PROGRESS,
    });

    test('includes the id, status and description', () => {
        const line = renderTask(task);

        expect(line).toContain('abc-123');
        expect(line).toContain('in-progress');
        expect(line).toContain('buy bread');
    });

    test('formats the dates as YYYY-MM-DD HH:mm', () => {
        expect(renderTask(task)).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);
    });

    test('shows the dates in local time, not UTC', () => {
        const expected = task.createdAt.toLocaleString('sv-SE').slice(0, 16);
        expect(renderTask(task)).toContain(expected);
    });
});
