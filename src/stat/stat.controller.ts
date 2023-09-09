import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatService } from './stat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IRequestJWT } from '../auth/interfaces/IRequestJWT';
import { Roles } from '../auth/roles.decorator';
import { UserRoleEnum } from '../user/types/user-role.enum';

@UseGuards(JwtAuthGuard)
@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Roles(UserRoleEnum.ADMIN)
  @Get('departments')
  getDepartmentsStat(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.statService.getDepartmentsStat(startDate, endDate);
  }
  @Roles(UserRoleEnum.ADMIN)
  @Get('employees')
  getEmployeesStat(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.statService.getEmployeesStat(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('orders/stopped')
  getOrdersStoppedStat(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.statService.getOrdersStoppedStat(startDate, endDate);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('orders/reclamation')
  getOrdersReclamationStat(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.statService.getOrdersReclamationStat(startDate, endDate);
  }

  @Roles(UserRoleEnum.EMPLOYEE)
  @Get('self')
  getSelfStat(
    @Req() req: IRequestJWT,
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.statService.getUserStat(req.user.id, startDate, endDate);
  }
}
