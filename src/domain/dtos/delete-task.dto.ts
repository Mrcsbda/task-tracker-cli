export class DeleteTaskDto {
    private constructor(
        public readonly id: string,
    ) { }

    static create(props: { id?: string }): [string?, DeleteTaskDto?] {
        const id = props.id?.trim();
        if (!id) return ['id is required'];

        return [undefined, new DeleteTaskDto(id)];
    }
}