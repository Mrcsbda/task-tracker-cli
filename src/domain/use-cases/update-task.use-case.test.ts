import { buildTask, mockRepository } from '../../test-support/mocks';
import { UpdateTaskDescriptionDto } from '../dtos/update-task-description.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';
import { TaskStatus } from '../entities/task.entity';
import { UpdateTaskUseCase } from './update-task.use-case';

describe('UpdateTaskUseCase', () => {
    test('forwards a description dto to the repository', () => {
        const repository = mockRepository();
        const updated = buildTask({ description: 'buy wholemeal bread' });
        repository.updateTask.mockReturnValue(updated);

        const [_e, dto] = UpdateTaskDescriptionDto.create({ id: 'task-id', description: 'buy wholemeal bread' });
        const result = new UpdateTaskUseCase(repository).execute(dto!);

        expect(repository.updateTask).toHaveBeenCalledWith(dto);
        expect(result).toBe(updated);
    });

    test('forwards a status dto to the repository', () => {
        const repository = mockRepository();
        const updated = buildTask({ status: TaskStatus.DONE });
        repository.updateTask.mockReturnValue(updated);

        const [_e, dto] = UpdateTaskStatusDto.create({ id: 'task-id', status: TaskStatus.DONE });
        const result = new UpdateTaskUseCase(repository).execute(dto!);

        expect(repository.updateTask).toHaveBeenCalledWith(dto);
        expect(result).toBe(updated);
    });
});
