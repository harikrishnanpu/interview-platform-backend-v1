import crypto from "node:crypto";
import type { IIdGeneratorService } from "application/ports/services/IIdgenerator.service";

export class IdGeneratingService implements IIdGeneratorService {
	generateId(): string {
		return crypto.randomUUID();
	}
}
