import type { IDbMapper } from "@domain/mappers/db.mapper";
import type { IRead } from "@domain/repositories/base/read";
import type { IWrite } from "domain/repositories/base/write";

export abstract class BaseRepository<
	Entity,
	Persistence,
	DbMapper extends IDbMapper<Entity, Persistence>,
> implements IRead<Entity, Partial<Entity>>, IWrite<Entity>
{
	private model: any;
	private mapper: DbMapper;

	constructor(
		model: any,
		private dbMapper: DbMapper,
	) {
		this.model = model;
		this.mapper = dbMapper;
	}

	async findById(id: Pick<Entity, keyof Entity>): Promise<Entity | null> {
		const raw = await this.model.findById(id);
		return this.mapper.toDomain(raw);
	}

	async findAll(filter: Partial<Entity>): Promise<Entity[]> {
		const rawList = await this.model.find(filter);
		return rawList.map((raw: Persistence) => this.mapper.toDomain(raw));
	}

	async create(entity: Entity): Promise<Entity> {
		const persistence = this.mapper.toPersistence(entity);
		const created = await this.model.create(persistence);
		return this.mapper.toDomain(created);
	}

	async update(
		id: Pick<Entity, keyof Entity>,
		entity: Entity,
	): Promise<Entity | null> {
		const persistence = this.mapper.toPersistence(entity);
		const updated = await this.model.findByIdAndUpdate(id, persistence, {
			new: true,
		});
		return this.mapper.toDomain(updated);
	}
}
