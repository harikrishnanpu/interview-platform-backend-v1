import type { User } from "../entities/user.entity";
import type { IRead } from "./base/read";
import type { IWrite } from "./base/write";

export interface IUserRepository
	extends IRead<User, { email: string }>,
		IWrite<User> {
	findByEmail(email: string): Promise<User | null>;
}
