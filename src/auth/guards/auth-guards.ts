import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = (req.headers.authorization || '').replace('Bearer ', '');
            
            if (!token) {
                throw new UnauthorizedException({message: 'User not authorizated'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return true

        } catch (error) {
            throw new UnauthorizedException({ message: 'User not authorized!' });
        }
    }
}