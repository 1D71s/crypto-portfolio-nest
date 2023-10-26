import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthInput } from './dto/register-auth.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; 
import { LoginAuthInput } from './dto/login-auth.input';
import { Response } from 'express';


@Injectable()
export class AuthService {
  
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginAuthInput, res: Response) {

        const user = await this.validateUser(dto);
        const token = await this.generateToken(user);

        res.cookie('token', token.token);

        return token
    }


    async registration(dto: CreateAuthInput) {

        const candidate = await this.userService.getUserByEmail(dto.email);

        if (candidate) {
            throw new HttpException('Пользователь с такой почтой существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);
        
        const user = await this.userService.create({ ...dto, password: hashPassword });

        return this.generateToken(user);
    }


    private async generateToken(user: any) {

        const payload = await { id: user.id };
        
        return {
            token: this.jwtService.sign(payload),
        };
    }


    private async validateUser(dto: LoginAuthInput) {

        const user = await this.userService.getUserByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException({ message: 'User is not found!' });
        }
        
        const passwordEquals = await bcrypt.compare(dto.password, user.password);


        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Data is not correct!' });
    }
}
