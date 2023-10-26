import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entity/user.entity';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(() => UserEntity, { name: 'registration' })
    registration(@Args('input') dto: CreateUserDto) {
        return this.authService.registration(dto);
    }
}