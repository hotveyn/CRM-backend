import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../utils/hash.service';
import { Department } from '../department/entities/department.model';
import { UserRoleEnum } from './types/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly hashService: HashService,
  ) {}

  async create(userCreateDto: CreateUserDto): Promise<User> {
    userCreateDto.password = await this.hashService.hash(
      userCreateDto.password,
    );
    return this.userModel.create(userCreateDto);
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { login },
      include: [Department],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findOne({
      where: { id },
      include: [Department],
    });
  }

  async findAllNormal(): Promise<User[] | null> {
    return this.userModel.findAll({
      where: { role: 'employee' },
      include: [Department],
    });
  }

  async findAllFired(): Promise<User[] | null> {
    return this.userModel.findAll({
      where: { role: 'fired' },
      include: [Department],
    });
  }

  async removeById(id: number): Promise<User | void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.destroy();
    return user;
  }

  async fire(id: number): Promise<User | void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = UserRoleEnum.FIRED;
    await user.save();
    return user;
  }

  async unfire(id: number): Promise<User | void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = UserRoleEnum.EMPLOYEE;
    await user.save();
    return user;
  }

  async findByCode(code: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { code },
      include: [Department],
    });
  }
}
