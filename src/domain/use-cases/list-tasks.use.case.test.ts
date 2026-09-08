import { buildTask, mockRepository } from '../../test-support/mocks';
import { ListTasksDto } from '../dtos/list-tasks.dto';
import { TaskStatus } from '../entities/task.entity';
import { ListTaskUseCase } from './list-tasks.use.case';

describe('ListTaskUseCase', () => {
    test('asks the repository for every task when no dto is given', () => {
        const repository = mockRepository();
        const tasks = [buildTask()];
        repository.listTasks.mockReturnValue(tasks);

        const result = new ListTaskUseCase(repository).execute();

        expect(repository.listTasks).toHaveBeenCalledWith(undefined);
        expect(result).toBe(tasks);
    });

    test('forwards the dto when filtering by status', () => {
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([]);

        const [_e, dto] = ListTasksDto.create({ status: TaskStatus.DONE });
        new ListTaskUseCase(repository).execute(dto!);

        expect(repository.listTasks).toHaveBeenCalledWith(dto);
    });
});
