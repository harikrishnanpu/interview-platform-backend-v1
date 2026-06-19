import type { AuthProvider } from "../value-objects/auth-provider.vo";

export type UserRole = "admin" | "user" | "interviewer" | "org";
export type UserStatus = "active" | "blocked";

export class User {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly email: string,
		public readonly provider: AuthProvider,
		public readonly role: UserRole,
		public readonly status: UserStatus,
	) {}

	public static create({
		id,
		name,
		email,
		provider,
		role = "user",
		status = "active",
	}: {
		id: string;
		name: string;
		email: string;
		provider: AuthProvider;
		role?: UserRole;
		status?: UserStatus;
	}): User {
		return new User(id, name, email, provider, role, status);
	}
}
