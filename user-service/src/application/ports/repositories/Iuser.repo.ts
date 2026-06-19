import type { User } from "domain/entities/user.entity";
import type { IRead } from "domain/repositories/base/read";
import type { IWrite } from "domain/repositories/base/write";

export interface IUserRepository
	extends IWrite<User>,
		IRead<User, Partial<User>> {
	findByEmail(email: string): Promise<User | null>;
}
