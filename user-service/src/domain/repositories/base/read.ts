

export interface IRead<Entity, Filter extends Partial<Entity>> {
    findById(id: Pick<Entity, keyof Entity>): Promise<Partial<Entity> | null>;
    findAll(filter: Filter): Promise<Entity[]>;
}