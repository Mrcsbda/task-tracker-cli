import { EXIT_SIGNAL, restoreConsole, spyConsole } from '../../test-support/console';
import { buildTask, mockRepository } from '../../test-support/mocks';
import { AddTaskCommand } from './add-task.command';

describe('AddTaskCommand', () => {
    afterEach(restoreConsole);

    test('adds the task and prints its id', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.addTask.mockReturnValue(buildTask({ id: 'abc-123' }));

        AddTaskCommand.execute('buy bread', repository);

        expect(repository.addTask).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith('Task added successfully (ID: abc-123)');
    });

    test('prints the validation error and exits without touching the repository', () => {
        const { error, exit } = spyConsole();
        const repository = mockRepository();

        expect(() => AddTaskCommand.execute('', repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('description is required');
        expect(exit).toHaveBeenCalledWith(1);
        expect(repository.addTask).not.toHaveBeenCalled();
    });
});
