import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRoleEnum } from '../user/types/user-role.enum';
import { GetDepartmentsStatProcedure } from './procedures/get-departments-stat.procedure';
import { GetEmployeesStatProcedure } from './procedures/get-employees-stat.procedure';
import { GetPaymentStatProcedure } from './procedures/get-payment-stat.procedure';
import { GetStoppedOrdersStatProcedure } from './procedures/get-stopped-orders-stat.procedure';
import { GetReclamationOrdersStatProcedure } from './procedures/get-reclamation-orders-stat.procedure';
import { GetUsersStatProcedure } from './procedures/get-users-stat.procedure';
import { DateRangeDto } from './dto/date-range.dto';
import { GetUserDetailedStatProcedure } from './procedures/get-user-detailed-stat.procedure';

@UseGuards(JwtAuthGuard)
@Controller('stat')
export class StatController {
  constructor(
    private readonly getDepartmentsStatProcedure: GetDepartmentsStatProcedure,
    private readonly getEmployeesStatProcedure: GetEmployeesStatProcedure,
    private readonly getPaymentStatProcedure: GetPaymentStatProcedure,
    private readonly getStoppedOrdersStatProcedure: GetStoppedOrdersStatProcedure,
    private readonly getReclamationOrdersStatProcedure: GetReclamationOrdersStatProcedure,
    private readonly getUsersStatProcedure: GetUsersStatProcedure,
    private readonly getUserDetailedStatProcedure: GetUserDetailedStatProcedure,
  ) {}

  @Roles(UserRoleEnum.ADMIN)
  @Get('departments')
  getDepartmentsStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getDepartmentsStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('employees')
  getEmployeesStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getEmployeesStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('payment')
  getPaymentStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getPaymentStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('orders/stopped')
  getOrdersStoppedStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getStoppedOrdersStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('orders/reclamation')
  getOrdersReclamationStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getReclamationOrdersStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.EMPLOYEE)
  @Get('users')
  getUsersStat(
    @Query('start') startDate = '2004-07-13T22:02:32.395Z',
    @Query('end') endDate = '2077-11-05T22:02:32.395Z',
  ) {
    return this.getUsersStatProcedure.execute(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.EMPLOYEE)
  @Get('/user/:id/detailed')
  getUserDetailedStat(
    @Param('id', ParseIntPipe) id: number,
    @Query() dateRange: DateRangeDto,
  ) {
    return this.getUserDetailedStatProcedure.execute(id, dateRange);
  }
}
