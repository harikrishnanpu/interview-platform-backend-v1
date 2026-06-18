


export interface DbMapper<Entity, Persistence> {
    toDomain(persistence: Persistence): Entity;
    toPersistence(entity: Entity): Persistence;
}