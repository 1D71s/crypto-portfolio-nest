import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma';

@Module({
    controllers: [],
    providers: [UserService, PrismaService, UserResolver],
})
export class UserModule {}
