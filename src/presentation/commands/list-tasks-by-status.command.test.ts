import { TaskStatus } from '../../domain/entities/task.entity';
import { EXIT_SIGNAL, restoreConsole, spyConsole } from '../../test-support/console';
import { buildTask, mockRepository } from '../../test-support/mocks';
import { ListTasksByStatusCommand } from './list-tasks-by-status.command';

describe('ListTasksByStatusCommand', () => {
    afterEach(restoreConsole);

    test('forwards the status to the repository and prints the matches', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([buildTask({ description: 'buy bread', status: TaskStatus.DONE })]);

        ListTasksByStatusCommand.execute('done', repository);

        expect(repository.listTasks).toHaveBeenCalledWith(expect.objectContaining({ status: 'done' }));
        expect(log).toHaveBeenCalledTimes(1);
    });

    test('exits when the status is not valid', () => {
        const { error, exit } = spyConsole();
        const repository = mockRepository();

        expect(() => ListTasksByStatusCommand.execute('pending', repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('status must be one of: todo, in-progress, done');
        expect(exit).toHaveBeenCalledWith(1);
        expect(repository.listTasks).not.toHaveBeenCalled();
    });

    test('prints a friendly message when nothing matches the status', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.listTasks.mockReturnValue([]);

        ListTasksByStatusCommand.execute('done', repository);

        expect(log).toHaveBeenCalledWith('you dont have any task with status in "done" yet');
    });
});
