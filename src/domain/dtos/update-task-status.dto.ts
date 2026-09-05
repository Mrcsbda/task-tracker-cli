import { TaskStatus } from "../entities/task.entity";

export class UpdateTaskStatusDto {
    private constructor(
        public readonly id: string,
        public readonly status: TaskStatus,
    ) { }

    static create(props: { id?: string, status?: TaskStatus }): [string?, UpdateTaskStatusDto?] {
        const id = props.id?.trim();
        if (!id) return ['id is required'];

        const status = props.status;
        if (!status) return ['status is required'];

        if (!Object.values(TaskStatus).includes(status)) return [`status must be one of: ${Object.values(TaskStatus).join(', ')}`];


        return [undefined, new UpdateTaskStatusDto(id, status)];
    }
}