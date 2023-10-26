import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/register-auth.input';
import { TokenEntity } from './entity/token.entity';
import { LoginAuthInput } from './dto/login-auth.input';
import { Response, Request } from 'express';
import { UserEntity } from 'src/user/entity/user.entity';


@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Query(() => TokenEntity, { name: 'login' })
    login(@Context('res') res: Response, @Args('input') dto: LoginAuthInput) {
        return this.authService.login(dto, res);
    }

    @Mutation(() => TokenEntity, { name: 'registration' })
    registration(@Args('input') dto: CreateAuthInput) {
        return this.authService.registration(dto);
    }

    @Query(() => UserEntity, { name: 'getme' })
    getMe(@Context('req') req: Request) {
        return this.authService.getMe(req);
    }
}