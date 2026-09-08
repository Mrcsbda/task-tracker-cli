import { TaskStatus } from '../../domain/entities/task.entity';
import { buildTask, mockRepository } from '../../test-support/mocks';
import { EXIT_SIGNAL, restoreConsole, spyConsole } from '../../test-support/console';
import { UpdateTaskStatusCommand } from './update-status.command';

describe('UpdateTaskStatusCommand', () => {
    afterEach(restoreConsole);

    test('passes the given status through to the repository', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.updateTask.mockReturnValue(buildTask({ id: 'abc-123', status: TaskStatus.DONE }));

        UpdateTaskStatusCommand.execute('abc-123', TaskStatus.DONE, repository);

        expect(repository.updateTask).toHaveBeenCalledWith(
            expect.objectContaining({ id: 'abc-123', status: TaskStatus.DONE }),
        );
        expect(log).toHaveBeenCalledWith('Task updated successfully (ID: abc-123)');
    });

    test('prints the validation error and exits when no id is given', () => {
        const { error, exit } = spyConsole();
        const repository = mockRepository();

        expect(() => UpdateTaskStatusCommand.execute('', TaskStatus.DONE, repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('id is required');
        expect(exit).toHaveBeenCalledWith(1);
        expect(repository.updateTask).not.toHaveBeenCalled();
    });
});
