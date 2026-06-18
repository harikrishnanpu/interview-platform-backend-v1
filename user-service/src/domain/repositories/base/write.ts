

export interface IWrite<Entity> {
    create(entity: Entity): Promise<Entity>;
    update(id: Pick<Entity, keyof Entity>, entity: Partial<Entity>): Promise<Entity | null>;
    delete(id: Pick<Entity, keyof Entity>): Promise<boolean>;
}