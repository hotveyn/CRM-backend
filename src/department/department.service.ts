import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './entities/department.model';
import { CreateDepartmentDto } from './dto/createDepartmentDto';
import { Break } from '../break/entities/break.model';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    return this.departmentModel.create({ name: dto.name });
  }
  async findById(id: number): Promise<Department | null> {
    return this.departmentModel.findOne({
      where: { id },
      include: [Break],
    });
  }

  async findAll(): Promise<Department[] | null> {
    return this.departmentModel.findAll();
  }

  async removeById(id: number): Promise<Department | void> {
    const department = await this.findById(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    await department.destroy();
    return department;
  }

  async updateById(id: number, dto: CreateDepartmentDto): Promise<Department> {
    const department = await this.findById(id);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    department.name = dto.name;
    return await department.save();
  }
}
