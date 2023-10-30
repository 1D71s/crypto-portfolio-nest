import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from 'src/auth/dto/register-auth.input';
import { PrismaService } from 'src/common/prisma/prisma';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    public async create(createUserDto: CreateAuthInput): Promise<UserEntity> {
        try {
            return this.prisma.user.create({ data: createUserDto });
        } catch (error) {
            throw error;
        }
    }

    public async getUserByEmail(email: string): Promise<UserEntity> {
        try { 
            const user = await this.prisma.user.findUnique({
                where: { email: email }
            });
    
            return user;
        } catch (error) {
            throw error;
        }
    }
    

    public async getUserById(id: string): Promise<UserEntity> {
        try { 
            const user = await this.prisma.user.findFirst({
                where: { id: +id }
            });

            return user

        } catch (error) {
            throw error;
        }
    }

    public async getAllUsers(): Promise<UserEntity[]> {
        try {
            const users = await this.prisma.user.findMany();

            if (users.length < 1) {
                throw new UnauthorizedException({ message: 'Users is not found!' });
            }

            return users;

        } catch (error) {
            throw error;
        }
    }
}
