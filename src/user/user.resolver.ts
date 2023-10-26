import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entity/user.entity';


@Resolver()
export class UserResolver {
    
    constructor(private readonly userService: UserService) {}

    @Query(() => UserEntity, { name: 'getUserById' })
    getUserById(@Args('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Query(() => [UserEntity], { name: 'getAllUsers' })
    getAllUsers() {
        return this.userService.getAllUsers()
    }
}