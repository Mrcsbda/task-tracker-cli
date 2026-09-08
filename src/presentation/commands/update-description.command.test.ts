import { buildTask, mockRepository } from '../../test-support/mocks';
import { EXIT_SIGNAL, restoreConsole, spyConsole } from '../../test-support/console';
import { UpdateTaskDescriptionCommand } from './update-description.command';

describe('UpdateTaskDescriptionCommand', () => {
    afterEach(restoreConsole);

    test('updates the description and prints the task id', () => {
        const { log } = spyConsole();
        const repository = mockRepository();
        repository.updateTask.mockReturnValue(buildTask({ id: 'abc-123' }));

        UpdateTaskDescriptionCommand.execute('abc-123', 'buy wholemeal bread', repository);

        expect(repository.updateTask).toHaveBeenCalledWith(
            expect.objectContaining({ id: 'abc-123', description: 'buy wholemeal bread' }),
        );
        expect(log).toHaveBeenCalledWith('Task updated successfully (ID: abc-123)');
    });

    test('exits when no id is given', () => {
        const { error, exit } = spyConsole();
        const repository = mockRepository();

        expect(() => UpdateTaskDescriptionCommand.execute('', 'buy bread', repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('id is required');
        expect(exit).toHaveBeenCalledWith(1);
    });

    test('exits when no description is given', () => {
        const { error } = spyConsole();
        const repository = mockRepository();

        expect(() => UpdateTaskDescriptionCommand.execute('abc-123', '', repository)).toThrow(EXIT_SIGNAL);

        expect(error).toHaveBeenCalledWith('description is required');
        expect(repository.updateTask).not.toHaveBeenCalled();
    });
});
