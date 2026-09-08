import { AddTaskDto } from './add-task.dto';

describe('AddTaskDto', () => {
    test('returns an error when no description is provided', () => {
        const [error, dto] = AddTaskDto.create({});
        expect(error).toBe('description is required');
        expect(dto).toBeUndefined();
    });

    test('returns an error when the description exceeds 100 characters', () => {
        const [error] = AddTaskDto.create({ description: 'a'.repeat(101) });
        expect(error).toBe('description must be under 100 chars');
    });
});
