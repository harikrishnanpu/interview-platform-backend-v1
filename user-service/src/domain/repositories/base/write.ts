export interface IWrite<Entity> {
	save(entity: Entity): Promise<Entity>;
}
