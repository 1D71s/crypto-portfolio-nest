import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from 'src/auth/dto/register-auth.input';
import { PrismaService } from 'src/common/prisma/prisma';
import { User } from './types';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    public async create(createUserDto: CreateAuthInput): Promise<User> {
        try {
            return this.prisma.user.create({ data: createUserDto });
        } catch (error) {
            throw error;
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try { 
            const user = await this.prisma.user.findUnique({
                where: { email: email }
            });
    
            return user;
        } catch (error) {
            throw error;
        }
    }
    

    public async getUserById(id: string): Promise<User | null>  {
        try { 
            const user = await this.prisma.user.findFirst({
                where: { id: +id }
            });

            return user

        } catch (error) {
            throw error;
        }
    }

    public async getAllUsers(): Promise<User[]>  {
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
