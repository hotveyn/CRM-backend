import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegDto } from './dto/reg.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('reg-employee')
  registerEmployee(@Body() regDto: RegDto) {
    return this.authService.regEmployee(regDto);
  }

  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @Get('refresh')
  // refresh(@Request() req) {
  //   return this.authService.refresh(req.user);
  // }

  // @Get('logout')
  // logout(@Request() req) {
  //   return this.authService.logout(req.user);
  // }

  // @Get('users')
  // getUsers() {
  //   return this.authService.getUsers();
  // }
}
