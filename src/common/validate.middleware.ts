import { IMiddleware } from './middleware.interface';
import { NextFunction, Response, Request } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction) {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((error) => {
			if (error.length) {
				res.status(422).send(error);
			} else {
				next();
			}
		});
	}
}
