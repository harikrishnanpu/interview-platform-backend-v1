export interface IRead<Entity, Filter extends Partial<Entity>> {
	findById(id: Pick<Entity, keyof Entity>): Promise<Entity | null>;
	findAll(filter: Filter): Promise<Entity[]>;
}
