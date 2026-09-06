import { TaskStatus } from "../entities/task.entity";

export class ListTasksDto {
    private constructor(
        public readonly status: string,
    ) { }

    static create(props: { status: string }): [string?, ListTasksDto?] {
        const status = props.status;
        if (!status) return ['status is required'];


        if (!Object.values(TaskStatus).includes(status as TaskStatus)) return [`status must be one of: ${Object.values(TaskStatus).join(', ')}`];


        return [undefined, new ListTasksDto(status)];
    }
}