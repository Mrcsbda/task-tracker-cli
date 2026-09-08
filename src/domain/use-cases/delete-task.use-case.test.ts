import { buildTask, mockRepository } from '../../test-support/mocks';
import { DeleteTaskDto } from '../dtos/delete-task.dto';
import { DeleteTaskUseCase } from './delete-task.use-case';

describe('DeleteTaskUseCase', () => {
    test('forwards the dto to the repository and returns the deleted task', () => {
        const repository = mockRepository();
        const deleted = buildTask();
        repository.deleteTask.mockReturnValue(deleted);

        const [_e, dto] = DeleteTaskDto.create({ id: 'task-id' });
        const result = new DeleteTaskUseCase(repository).execute(dto!);

        expect(repository.deleteTask).toHaveBeenCalledWith(dto);
        expect(result).toBe(deleted);
    });
});
