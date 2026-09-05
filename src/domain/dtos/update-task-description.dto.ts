
export class UpdateTaskDescriptionDto {
    private constructor(
        public readonly id: string,
        public readonly description: string,
    ) { }

    static create(props: { id?: string, description?: string }): [string?, UpdateTaskDescriptionDto?] {
        const id = props.id?.trim();
        if (!id) return ['id is required'];

        const description = props.description?.trim();
        if (!description) return ['description is required'];
        if (description.length > 100) return ['description must be under 100 chars'];

        return [undefined, new UpdateTaskDescriptionDto(id, description)];
    }
}