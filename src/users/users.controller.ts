import { BaseController } from '../common/base.controller';
import { NextFunction, Response, Request } from 'express';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersInterface } from './users.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersInterface {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HttpError(401, 'Unauthorized', 'login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('JWT_SECRET'));
		this.ok(res, { res: 'Success', token: jwt });
	}

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(req.body);
		if (!result) {
			return next(new HttpError(422, 'User exist', 'register'));
		}
		this.ok(res, { email: result.email, name: result.name, id: result.id });
	}

	private signJWT = (email: string, secret: string): Promise<string> => {
		return new Promise<string>((resolve, reject) => {
			sign(
				{ email, iat: Math.floor(Date.now() / 1000) },
				secret,
				{
					algorithm: 'HS256',
					expiresIn: '1h',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	};
}
