export const printError = (error: string): never => {
    console.error(error)
    process.exit(1)
}