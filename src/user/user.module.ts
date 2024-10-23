import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { AuthModule } from '../auth/auth.module';
import { userProcedures } from './procedures';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService, ...userProcedures],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
