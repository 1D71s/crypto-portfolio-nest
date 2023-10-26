import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from 'src/auth/dto/register-auth.input';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    create(createUserDto: CreateAuthInput) {
        return this.prisma.user.create({ data: createUserDto });
    }

    getUserByEmail(email: string) {
        
        return this.prisma.user.findUnique({
            where: {
                email: email 
            }
        });
    }

    getUserById(id: string) {
        return this.prisma.user.findFirst({
            where: {
                id: +id
            }
        })
    }

    getAllUsers() {
        return this.prisma.user.findMany()
    }
}
