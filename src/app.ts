import { FileSystemDatasource } from "./infrastructure/datasources/file-system/file-system.datasource";
import { TaskRepositoryImplementation } from "./infrastructure/repositories/task.repository.implementation";
import { CliApp } from "./presentation/cli-app";

(async () => {
    main();
})();

async function main() {
    const datasource = new FileSystemDatasource();
    const taskRepository = new TaskRepositoryImplementation(datasource);

    CliApp.start(taskRepository);
}