import { User } from "../user.entity";
import { IRead } from "./base/read";
import { IWrite } from "./base/write";

export interface IUserRepository
	extends IRead<User, { email: string }>,
		IWrite<User> {
	findByEmail(email: string): Promise<User | null>;
}
