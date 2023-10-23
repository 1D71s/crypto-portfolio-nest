import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({ data: createUserDto });
    }
}
