export interface IIdGeneratorService {
	generateId(): Promise<string>;
}
