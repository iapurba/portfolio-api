import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModelModule } from './schemas/user.model';

@Module({
  imports: [UserModelModule],
  providers: [UsersService],
  exports: [UsersService, UserModelModule],
})
export class UsersModule {}
