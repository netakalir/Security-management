import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from "../auth/auth.constants"
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("try to pass the guard");
        const request = context.switchToHttp().getRequest();// גישה לבקשה הנוכחית אחרי שהיא מומרת לפורמט הרגיל של EXPRESS
        console.log("🚀 ~ canActivate ~ request:", request)
        const token = this.extractTokenFromHeader(request);
        console.log("🚀 ~ canActivate ~ token:", token)
        if (!token) {
            throw new UnauthorizedException();
        }//אם לא קיים יזרוק שגיאה
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log("🚀 ~ extractTokenFromHeader ~ token:", token)
        console.log("🚀 ~ extractTokenFromHeader ~ type:", type)
        
        return type === 'Bearer' ? token : undefined;//חילוץ הטוקן מההדר
    }
}
