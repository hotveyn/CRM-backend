import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload } from './interfaces/IJWTPayload';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '../user/types/user-role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    try {
      const authHeader = req.headers.authorization;
      const splitedHeader = authHeader.split(' ');
      const bearer = splitedHeader[0];
      const token = splitedHeader[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }

      req.user = this.jwtService.verify<IJWTPayload>(token);
      if (requiredRoles) {
        const { role } = req.user;
        if (!requiredRoles.includes(role)) {
          throw new HttpException(
            { message: 'Forbidden' },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User not authorized' });
    }
  }
}
