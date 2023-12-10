import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MonetaryMatrixService } from './monetary-matrix.service';
import { CreateMonetaryMatrixDto } from './dto/create-monetary-matrix.dto';
import { UpdateMonetaryMatrixDto } from './dto/update-monetary-matrix.dto';

@Controller('monetary-matrix')
export class MonetaryMatrixController {
  constructor(private readonly monetaryMatrixService: MonetaryMatrixService) {}

  @Post()
  create(@Body() createMonetaryMatrixDto: CreateMonetaryMatrixDto) {
    return this.monetaryMatrixService.create(createMonetaryMatrixDto);
  }

  @Get()
  findAll() {
    return this.monetaryMatrixService.findAll();
  }

  @Get('one')
  findOne(
    @Query('order_type_id', ParseIntPipe) order_type_id: number,
    @Query('department_id', ParseIntPipe) department_id: number,
  ) {
    return this.monetaryMatrixService.findOne(order_type_id, department_id);
  }

  @Patch('update')
  update(
    @Query('order_type_id', ParseIntPipe) order_type_id: number,
    @Query('department_id', ParseIntPipe) department_id: number,
    @Body() updateMonetaryMatrixDto: UpdateMonetaryMatrixDto,
  ) {
    return this.monetaryMatrixService.update(
      order_type_id,
      department_id,
      updateMonetaryMatrixDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.monetaryMatrixService.remove(id);
  }
}
