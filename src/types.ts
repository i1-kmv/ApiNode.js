import 'reflect-metadata';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	UsersRepository: Symbol.for('UsersRepository'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
};
