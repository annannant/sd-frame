import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
// import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [UserModule],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
