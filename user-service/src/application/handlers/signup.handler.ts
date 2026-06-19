import { ConflictException, Injectable } from "@nestjs/common";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { SignupUserCommand } from "application/commands/signup.command";
import { SIGNUP_USER_CONSTANTS } from "application/constants/signup.constants";
import type { SingnUpResponseDto } from "application/dtos/singnup.dto";
import type { IIdGeneratorService } from "application/ports/services/IIdgenerator.service";
import type { IPasswordHashService } from "application/ports/services/IpasswordHash.service";
import type { ITokenService } from "application/ports/services/Itoken.service";
import { User } from "domain/entities/user.entity";
import type { IUserRepository } from "domain/repositories/user.repo";
import { AuthProvider } from "domain/value-objects/auth-provider.vo";

@CommandHandler(SignupUserCommand)
@Injectable()
export class SignupUserHandler
	implements ICommandHandler<SignupUserCommand, SingnUpResponseDto>
{
	constructor(
		private readonly _userRepository: IUserRepository,
		private readonly _idGeneratorService: IIdGeneratorService,
		private readonly _tokenService: ITokenService<Partial<User>>,
		private readonly _passwordHashService: IPasswordHashService,
	) {}

	async execute(command: SignupUserCommand): Promise<SingnUpResponseDto> {
		const { name, email, password, provider } = command;

		const user = await this._userRepository.findByEmail(email);

		if (user) {
			// fixme: doubt
			throw new ConflictException(SIGNUP_USER_CONSTANTS.USER_ALREADY_EXISTS);
		}

		const passwordHash = await this._passwordHashService.hashPassword(password);

		const newUserEntity = User.create({
			id: await this._idGeneratorService.generateId(),
			name,
			email,
			provider: AuthProvider.create(provider, passwordHash),
		});

		const newUser = await this._userRepository.save(newUserEntity);

		const userResponseDto = {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			status: newUser.status,
		};

		const accessToken =
			await this._tokenService.generateAccessToken(userResponseDto);

		const refreshToken =
			await this._tokenService.generateRefreshToken(userResponseDto);

		return userResponseDto;
	}
}
