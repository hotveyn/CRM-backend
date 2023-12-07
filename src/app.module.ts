import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { UserDepartmentsModule } from './join-tables/user-departments/user-departments.module';
import { UtilsModule } from './utils/utils.module';
import { BreakModule } from './break/break.module';
import { OrderModule } from './order/order.module';
import { OrderStageModule } from './order-stage/order-stage.module';
import { BitrixModule } from './bitrix/bitrix.module';
import { StatModule } from './stat/stat.module';
import { OrderTypeModule } from './order-type/order-type.module';
import { PrefabModule } from './prefab/prefab.module';
import { MonetaryMatrixModule } from './monetary-matrix/monetary-matrix.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    DepartmentModule,
    UserDepartmentsModule,
    UtilsModule,
    BreakModule,
    OrderModule,
    OrderStageModule,
    BitrixModule,
    StatModule,
    OrderTypeModule,
    PrefabModule,
    MonetaryMatrixModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
