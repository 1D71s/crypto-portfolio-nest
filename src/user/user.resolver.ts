import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';


@Resolver()
export class UserResolver {
    
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserEntity, { name: 'createUser' })
    create(@Args('input') input: CreateUserDto,) {
        return this.userService.create(input);
    }

    @Query(() => UserEntity, { name: 'getUserById' })
    getUserById(@Args('id') id: string) {
        return this.userService.getUserById(id)
    }
}