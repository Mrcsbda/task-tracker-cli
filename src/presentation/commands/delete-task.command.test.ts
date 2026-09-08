import { buildTask, mockRepository } from '../../test-support/mocks';
import { EXIT_SIGNAL, restoreConsole, spyConsole } from '../../test-support/console';
import { DeleteTaskCommand } from './delete-task.command';

describe('DeleteTaskCommand', () => {
    afterEach(restoreConsole);

    test('deletes the task and prints its description', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.deleteTask.mockReturnValue(buildTask({ id: 'abc-123', description: 'buy bread' }));

        DeleteTaskCommand.execute('abc-123', repository);

        expect(repository.deleteTask).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith('Task deleted successfully: "buy bread", (ID: abc-123)');
    });

    test('prints the validation error and exits when no id is given', () => {
        const { error, exit } = spyConsole();
        const repository = mockRepository();

        expect(() => DeleteTaskCommand.execute('', repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('id is required');
        expect(exit).toHaveBeenCalledWith(1);
        expect(repository.deleteTask).not.toHaveBeenCalled();
    });
});
