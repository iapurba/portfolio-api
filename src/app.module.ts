import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProfileModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/portfolio'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
