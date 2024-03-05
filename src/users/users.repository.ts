import { IUsersRepository } from './users.repository.interface';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ name, password, email }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({ data: { name, password, email } });
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
