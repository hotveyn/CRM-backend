import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IRequestJWT } from '../auth/interfaces/IRequestJWT';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getUser(@Req() req: IRequestJWT) {
    return this.userService.findById(req.user.id);
  }

  @Get()
  findAll() {
    return this.userService.findAllNormal();
  }
  @Get('fired')
  findAllFired() {
    return this.userService.findAllFired();
  }

  @Patch(':id/fire')
  fire(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fire(id);
  }

  @Patch(':id/unfire')
  unfire(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fire(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeById(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}
