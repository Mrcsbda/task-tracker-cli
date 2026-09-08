import { TaskStatus } from '../entities/task.entity';
import { UpdateTaskStatusDto } from './update-task-status.dto';

describe('UpdateTaskStatusDto', () => {
    test('returns an error when no id is provided', () => {
        const [error, dto] = UpdateTaskStatusDto.create({ status: TaskStatus.DONE });
        expect(error).toBe('id is required');
        expect(dto).toBeUndefined();
    });

    test('returns a dto with the id trimmed and the given status', () => {
        const [error, dto] = UpdateTaskStatusDto.create({ id: ' abc-123 ', status: TaskStatus.IN_PROGRESS });
        expect(error).toBeUndefined();
        expect(dto?.id).toBe('abc-123');
        expect(dto?.status).toBe(TaskStatus.IN_PROGRESS);
    });
});
