
import { IRead } from "@domain/repositories/base/read";
import { IWrite } from "domain/repositories/base/write";

export abstract class BaseRepository<Entity, Persistence, DbMapper extends DbMapper<Entity, Persistence>> implements IRead<Entity, Partial<Entity>>, IWrite<Entity  > { 

    private model: any;
    private mapper: DbMapper;

    constructor(model: any, private dbMapper: DbMapper) {
        this.model = model;
        this.mapper = dbMapper;
    }

    findbyId(id: Pick<Entity, keyof Entity>): Promise<Entity | null> {
        const raw = this.model.findById(id);
        return this.mapper.toDomain(raw);
    }

}