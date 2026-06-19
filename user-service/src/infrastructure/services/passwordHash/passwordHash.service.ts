import type { IPasswordHashService } from "application/ports/services/IpasswordHash.service";
import * as bcrypt from "bcrypt";

export class BcryptPasswordHashService implements IPasswordHashService {
	private readonly _service: bcrypt;
	private readonly _saltRounds: number;

	constructor() {
		this._service = bcrypt;
		this._saltRounds = 10;
	}

	async hashPassword(password: string): Promise<string> {
		return await this._service.hash(password, this._saltRounds);
	}

	async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return await this._service.compare(password, hashedPassword);
	}
}
