import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthInput } from './dto/register-auth.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; 
import { LoginAuthInput } from './dto/login-auth.input';
import { Response, Request } from 'express';
import { UserEntity } from 'src/user/entity/user.entity';
import { TokenEntity } from './entity/token.entity';


@Injectable()
export class AuthService {
  
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    
    public async getMe(req: Request): Promise<UserEntity> {
        try {
            const token = req.cookies.token;
    
            if (!token) {
                throw new UnauthorizedException('Token not found');
            }
  
            const userId = await this.decodedToken(token)
            const user = await this.userService.getUserById(userId)
            
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return user;

        } catch (error) {
            throw new InternalServerErrorException('Something went wrong!');
        }
    }

    public async login(dto: LoginAuthInput, res: Response): Promise<TokenEntity> {
        try {
            const user = await this.validateUser(dto);
            const token = await this.generateToken(user);

            res.cookie('token', token.token);

            return token

        } catch (error) {
            throw new InternalServerErrorException('An error occurred while processing the authorization');
        }
    }


    public async registration(dto: CreateAuthInput): Promise<TokenEntity> {
        try {
            const candidate = await this.userService.getUserByEmail(dto.email);

            if (candidate) {
                throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST);
            }

            const hashPassword = await bcrypt.hash(dto.password, 5);
            
            const user = await this.userService.create({ ...dto, password: hashPassword });

            return this.generateToken(user);

        } catch (error) {
            throw new InternalServerErrorException('An error occurred while processing the registration');
        }
    }

    private async generateToken(user: any): Promise<TokenEntity> {
        try {
            const payload = { id: user.id };
            const token = this.jwtService.sign(payload);
    
            return { token };

        } catch (error) {
            throw new InternalServerErrorException('An error occurred while generating the token');
        }
    }

    private async decodedToken(token: string): Promise<string> {
        try {
            const user = await this.jwtService.verify(token);

            return user.id;

        } catch (error) {
            throw new InternalServerErrorException('An error occurred while generating the token');
        }
    }

    private async validateUser(dto: LoginAuthInput): Promise<UserEntity> {
        try {
            const user = await this.userService.getUserByEmail(dto.email);

            if (!user) {
                throw new UnauthorizedException({ message: 'User is not found!' });
            }
            
            const passwordEquals = await bcrypt.compare(dto.password, user.password);


            if (user && passwordEquals) {
                return user;
            }

            throw new UnauthorizedException({ message: 'Data is not correct!' });

        } catch (error) {
            throw new UnauthorizedException({ message: 'Authentication failed' });
        }
    }
}
