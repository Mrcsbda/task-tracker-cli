import { TaskStatus } from "../entities/task.entity";

export class UpdateTaskStatusDto {
    private constructor(
        public readonly id: string,
        public readonly status: TaskStatus,
    ) { }

    static create(props: { id?: string, status: TaskStatus }): [string?, UpdateTaskStatusDto?] {
        const id = props.id?.trim();
        if (!id) return ['id is required'];

        return [undefined, new UpdateTaskStatusDto(id, props.status)];
    }
}