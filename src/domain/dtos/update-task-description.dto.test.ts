import { UpdateTaskDescriptionDto } from './update-task-description.dto';

describe('UpdateTaskDescriptionDto', () => {
    test('returns an error when no id is provided', () => {
        const [error] = UpdateTaskDescriptionDto.create({ description: 'buy bread' });
        expect(error).toBe('id is required');
    });

    test('returns an error when no description is provided', () => {
        const [error] = UpdateTaskDescriptionDto.create({ id: 'abc-123' });
        expect(error).toBe('description is required');
    });

    test('returns an error when the description exceeds 100 characters', () => {
        const [error] = UpdateTaskDescriptionDto.create({ id: 'abc-123', description: 'a'.repeat(101) });
        expect(error).toBe('description must be under 100 chars');
    });
});
