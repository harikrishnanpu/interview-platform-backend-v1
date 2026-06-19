export interface ITokenService<T> {
	generateToken(payload: T, expiresIn?: string): Promise<string>;
	generateAccessToken(payload: T): Promise<string>;
	generateRefreshToken(payload: T): Promise<string>;
}
