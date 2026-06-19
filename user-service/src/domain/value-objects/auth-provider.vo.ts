export enum AuthProviderType {
	GOOGLE = "google",
	LOCAL = "local",
}

export class AuthProvider {
	private constructor(
		public readonly provider: AuthProviderType,
		protected readonly passwordHash?: string,
	) {}

	public static create(
		provider: AuthProviderType,
		passwordHash?: string,
	): AuthProvider {
		if (provider === AuthProviderType.LOCAL && !passwordHash) {
			throw new Error("Password hash is required for local authentication");
		}

		return new AuthProvider(provider, passwordHash);
	}
}
