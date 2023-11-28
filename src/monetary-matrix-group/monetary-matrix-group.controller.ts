import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonetaryMatrixGroupService } from './monetary-matrix-group.service';
import { CreateMonetaryMatrixGroupDto } from './dto/create-monetary-matrix-group.dto';
import { UpdateMonetaryMatrixGroupDto } from './dto/update-monetary-matrix-group.dto';

@Controller('monetary-matrix-group')
export class MonetaryMatrixGroupController {
  constructor(private readonly monetaryMatrixGroupService: MonetaryMatrixGroupService) {}

  @Post()
  create(@Body() createMonetaryMatrixGroupDto: CreateMonetaryMatrixGroupDto) {
    return this.monetaryMatrixGroupService.create(createMonetaryMatrixGroupDto);
  }

  @Get()
  findAll() {
    return this.monetaryMatrixGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monetaryMatrixGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonetaryMatrixGroupDto: UpdateMonetaryMatrixGroupDto) {
    return this.monetaryMatrixGroupService.update(+id, updateMonetaryMatrixGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monetaryMatrixGroupService.remove(+id);
  }
}
