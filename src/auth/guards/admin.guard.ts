import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { authConstants } from 'src/common/constants/auth.constant';
import { UserRole } from 'src/users/enums/role.enum';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user.role === UserRole.ADMIN) {
      return true;
    }
    throw new ForbiddenException(authConstants.FORBIDDEN);
  }
}
