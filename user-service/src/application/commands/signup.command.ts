import type { AuthProviderType } from "domain/value-objects/auth-provider.vo";

export class SignupUserCommand {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string,
		public readonly provider: AuthProviderType,
	) {}
}
