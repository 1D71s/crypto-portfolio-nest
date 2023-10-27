import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/common/prisma/prisma';

@Module({
    controllers: [],
    providers: [UserService, PrismaService, UserResolver],
    exports: [
        UserService,
    ]
})
export class UserModule {}
