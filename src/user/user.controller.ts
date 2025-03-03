import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IRequestJWT } from '../auth/interfaces/IRequestJWT';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';
import { UserRoleEnum } from './types/user-role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUsersProcedure } from './procedures/get-users.procedure';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly getUsersProcedure: GetUsersProcedure,
  ) {}

  @Get('profile')
  getUser(@Req() req: IRequestJWT) {
    return this.userService.findById(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(updateUserDto, id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('/normal')
  findAll() {
    return this.userService.findAllNormal();
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get('fired')
  findAllFired() {
    return this.userService.findAllFired();
  }

  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id/fire')
  fire(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fire(id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Patch(':id/unfire')
  unfire(@Param('id', ParseIntPipe) id: number) {
    return this.userService.unfire(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeById(id);
  }

  @Roles(UserRoleEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Get('/')
  getUsers(@Query() dto: GetUsersDto) {
    return this.getUsersProcedure.execute(dto);
  }
}
