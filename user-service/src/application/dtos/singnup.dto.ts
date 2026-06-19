import type { AuthProviderType } from "domain/value-objects/auth-provider.vo";

export interface SingnUpRequestDto {
	email: string;
	name: string;
	password?: string;
	provider: AuthProviderType;
}

export interface SingnUpResponseDto {
	id: string;
	name: string;
	email: string;
}
