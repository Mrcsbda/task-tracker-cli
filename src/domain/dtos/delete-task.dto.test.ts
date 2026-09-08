import { DeleteTaskDto } from './delete-task.dto';

describe('DeleteTaskDto', () => {
    test('returns an error when no id is provided', () => {
        const [error, dto] = DeleteTaskDto.create({});
        expect(error).toBe('id is required');
        expect(dto).toBeUndefined();
    });

    test('returns an error when the id is only whitespace', () => {
        const [error] = DeleteTaskDto.create({ id: '  ' });
        expect(error).toBe('id is required');
    });
});
