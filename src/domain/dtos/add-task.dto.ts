export class AddTaskDto {
    private constructor(public readonly description: string) { }

    static create(props: { description?: string }): [string?, AddTaskDto?] {
        const description = props.description?.trim();
        if (!description) return ['description is required'];
        if (description.length > 200) return ['description must be under 200 chars'];
        return [undefined, new AddTaskDto(description)];
    }
}