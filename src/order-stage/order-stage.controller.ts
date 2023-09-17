import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UserRoleEnum } from '../user/types/user-role.enum';
import { IRequestJWT } from '../auth/interfaces/IRequestJWT';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderStageService } from './order-stage.service';
import { BreakOrderStageDto } from './dto/break-order-stage.dto';

@UseGuards(JwtAuthGuard)
@Controller('order-stage')
export class OrderStageController {
  constructor(private readonly orderStageService: OrderStageService) {}
  // @Roles(UserRoleEnum.EMPLOYEE)
  @Get('available')
  findAvailableForUser(@Req() req: IRequestJWT) {
    return this.orderStageService.findAvailableForUser(req.user.id);
  }
  @Get('work')
  findWorkForUser(@Req() req: IRequestJWT) {
    return this.orderStageService.findWorkForUser(req.user.id);
  }

  // @Roles(UserRoleEnum.EMPLOYEE)
  @Patch(':id/claim')
  claimStageWithUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IRequestJWT,
  ) {
    return this.orderStageService.claimStageWithUser(id, req.user.id);
  }

  @Roles(UserRoleEnum.EMPLOYEE)
  @Patch(':id/ready')
  ready(@Param('id', ParseIntPipe) id: number, @Req() req: IRequestJWT) {
    return this.orderStageService.ready(id, req.user.id);
  }

  @Get(':id/break')
  getPossibleBreaks(@Param('id', ParseIntPipe) id: number) {
    return this.orderStageService.getPossibleBreaks(id);
  }

  @Patch(':id/break')
  break(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BreakOrderStageDto,
  ) {
    return this.orderStageService.break(id, body);
  }
}
