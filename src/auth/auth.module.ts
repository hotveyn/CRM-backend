import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';

//TODO: захуячить глобальным
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET_USER_AUTH,
      signOptions: { expiresIn: '720d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
