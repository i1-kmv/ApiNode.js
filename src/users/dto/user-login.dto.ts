import { IsEmail, isString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({ message: 'Невалидный email' })
	email: string;
	password: string;
}
