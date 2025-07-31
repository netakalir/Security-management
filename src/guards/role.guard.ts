import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.user;
        if (user.role !== 'commander') {
            throw new ForbiddenException('only commanders can access this route');
        }
        return true
    }
}


