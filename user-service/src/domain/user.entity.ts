import { AuthProvider } from "./value-objects/auth-provider.vo";

export type UserRole = "admin" | "user" | "interviewer" | "org";

export class User {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly email: string,
		public readonly provider: AuthProvider,
		public readonly role: UserRole,
	) {}

	create({
		id,
		name,
		email,
		provider,
		role = "user",
	}: {
		id: string;
		name: string;
		email: string;
		provider: AuthProvider;
		role?: UserRole;
	}): User {
		return new User(id, name, email, provider, role);
	}
}
