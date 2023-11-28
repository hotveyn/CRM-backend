import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monetaryMatrixService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonetaryMatrixDto: UpdateMonetaryMatrixDto) {
    return this.monetaryMatrixService.update(+id, updateMonetaryMatrixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monetaryMatrixService.remove(+id);
  }
}
