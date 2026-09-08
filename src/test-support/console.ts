// process.exit is mocked to throw so the test can assert that execution
// really stops there, the way it does in the real CLI.
export const EXIT_SIGNAL = 'process.exit called';

export const spyConsole = () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => { });
    const error = jest.spyOn(console, 'error').mockImplementation(() => { });
    const exit = jest.spyOn(process, 'exit').mockImplementation((() => {
        throw new Error(EXIT_SIGNAL);
    }) as never);

    return { log, error, exit };
};

export const restoreConsole = () => jest.restoreAllMocks();
