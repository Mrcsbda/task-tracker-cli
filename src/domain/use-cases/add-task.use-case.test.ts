import { buildTask, mockRepository } from '../../test-support/mocks';
import { AddTaskDto } from '../dtos/add-task.dto';
import { AddTaskUseCase } from './add-task.use-case';

describe('AddTaskUseCase', () => {
    test('forwards the dto to the repository and returns the created task', () => {
        const repository = mockRepository();
        const created = buildTask();
        repository.addTask.mockReturnValue(created);

        const [_e, dto] = AddTaskDto.create({ description: 'buy bread' });
        const result = new AddTaskUseCase(repository).execute(dto!);

        expect(repository.addTask).toHaveBeenCalledWith(dto);
        expect(repository.addTask).toHaveBeenCalledTimes(1);
        expect(result).toBe(created);
    });
});
