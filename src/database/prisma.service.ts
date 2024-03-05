import { inject, injectable } from 'inversify';
import { PrismaClient, UserModel } from '@prisma/client';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		try {
			this.client = new PrismaClient();
			this.logger.log('Prisma client has been initiated');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(e.message, 'PrismaService error connected to DB');
			}
		}
	}

	async connect(): Promise<void> {
		await this.client.$connect();
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
