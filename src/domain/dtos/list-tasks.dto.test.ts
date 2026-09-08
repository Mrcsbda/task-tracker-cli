import { ListTasksDto } from './list-tasks.dto';

describe('ListTasksDto', () => {
    test('returns an error when no status is provided', () => {
        const [error, dto] = ListTasksDto.create({ status: '' });
        expect(error).toBe('status is required');
        expect(dto).toBeUndefined();
    });

    test('returns an error when the status is not part of the enum', () => {
        const [error] = ListTasksDto.create({ status: 'pending' });
        expect(error).toBe('status must be one of: todo, in-progress, done');
    });
});
