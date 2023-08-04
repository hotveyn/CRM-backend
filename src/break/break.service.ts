import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBreakDto } from './dto/create-break.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Break } from './entities/break.model';
import { UpdateBreakDto } from './dto/update-break.dto';

@Injectable()
export class BreakService {
  constructor(
    @InjectModel(Break)
    private readonly breakModel: typeof Break,
  ) {}

  async create(createBreakDto: CreateBreakDto) {
    // for (const department_id of createBreakDto.departments) {
    //   await newBreak.$add('departments', department_id);
    // }

    return await this.breakModel.create(createBreakDto);
  }

  async findAll() {
    return await this.breakModel.findAll();
  }

  async findOne(id: number) {
    return await this.breakModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.breakModel.destroy({ where: { id } });
  }

  async update(id: string, updateBreakDto: UpdateBreakDto) {
    const breakToUpdate = await this.breakModel.findOne({ where: { id } });
    if (!breakToUpdate) {
      throw new HttpException('Break does not exist', HttpStatus.BAD_REQUEST);
    }
    await breakToUpdate.update(updateBreakDto);

    return breakToUpdate;
    // const breakToUpdate = await this.breakModel.findOne({ where: { id } });
    // breakToUpdate.name = updateBreakDto.name;
    // breakToUpdate.controlDepartmentId = updateBreakDto.control_department_id;
    // await breakToUpdate.save();
    //
    // const breakDepartments = await breakToUpdate.$get('departments');
    // for (const department of breakDepartments) {
    //   await breakToUpdate.$remove('departments', department.id);
    // }
    //
    // for (const department_id of updateBreakDto.departments) {
    //   await breakToUpdate.$add('departments', department_id);
    // }
    //
    // return breakToUpdate;
  }
}
