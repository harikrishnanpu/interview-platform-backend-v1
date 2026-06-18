


export interface IDbMapper<Entity, Persistence> {
    toDomain(persistence: Persistence): Entity;
    toPersistence(entity: Entity): Persistence;
}