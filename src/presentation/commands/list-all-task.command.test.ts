import { restoreConsole, spyConsole } from '../../test-support/console';
import { buildTask, mockRepository } from '../../test-support/mocks';
import { ListAllTasksCommand } from './list-all-task.command';

describe('ListAllTasksCommand', () => {
    afterEach(restoreConsole);

    test('prints one line per task', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([
            buildTask({ id: 'abc-123', description: 'buy bread' }),
            buildTask({ id: 'def-456', description: 'call the bank' }),
        ]);

        ListAllTasksCommand.execute(repository);

        expect(log).toHaveBeenCalledTimes(2);
    });

    test('asks for every task, with no status filter', () => {
        spyConsole();
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([]);

        ListAllTasksCommand.execute(repository);

        expect(repository.listTasks).toHaveBeenCalledWith(undefined);
    });

    test('prints a friendly message when there are no tasks', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([]);

        ListAllTasksCommand.execute(repository);

        expect(log).toHaveBeenCalledWith('you dont have any task yet');
    });
});
