import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/createDepartmentDto';
import { Department } from './entities/department.model';
import { DepartmentService } from './department.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetDepartmentBreaksProcedure } from './procedures/get-department-breaks.procedure';

@UseGuards(JwtAuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly getDepartmentBreaksProcedure: GetDepartmentBreaksProcedure,
  ) {}

  @Post()
  async create(@Body() departmentDto: CreateDepartmentDto) {
    return this.departmentService.create(departmentDto);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Department> {
    return this.departmentService.findById(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Department | void> {
    return this.departmentService.removeById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() departmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.updateById(id, departmentDto);
  }

  @Get(':id/breaks')
  async getDepartmentBreaks(@Param('id', ParseIntPipe) id: number) {
    return await this.getDepartmentBreaksProcedure.execute(id);
  }
}
