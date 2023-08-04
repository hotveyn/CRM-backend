import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegDto } from './dto/reg.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.model';
import { HashService } from '../utils/hash.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserRoleEnum } from '../user/types/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  async regEmployee(regDto: RegDto) {
    const isUserExist = await this.userService.findByLogin(regDto.login);
    if (isUserExist) {
      return new HttpException('User with that login already exist', 400);
    }

    if (regDto.code) {
      const isCodeExist = await this.userService.findByCode(regDto.code);
      if (isCodeExist) {
        return new HttpException('User with that code already exist', 400);
      }
    }

    const user = await this.userService.create({
      ...regDto,
      role: UserRoleEnum.EMPLOYEE,
    });

    for (const department_id of regDto.departments) {
      await user.$add('departments', department_id);
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.validateUser(
      loginDto.login,
      loginDto.password,
    );
    if (!user) {
      return new UnauthorizedException();
    }

    const payload = { login: user.login, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  //TODO: перенести в userService
  async validateUser(login: string, password: string): Promise<User | null> {
    const user: User | null = await this.userService.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid login',
      });
    }

    const passwordIsValid: boolean = await this.hashService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException({ message: 'Invalid password' });
    }

    return user;
  }
}
