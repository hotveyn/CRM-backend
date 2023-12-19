import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PrefabService } from './prefab.service';
import { CreatePrefabDto } from './dto/create-prefab.dto';
import { UpdatePrefabDto } from './dto/update-prefab.dto';

@Controller('prefab')
export class PrefabController {
  constructor(private readonly prefabService: PrefabService) {}

  @Post()
  create(@Body() createPrefabDto: CreatePrefabDto) {
    return this.prefabService.create(createPrefabDto);
  }

  @Get()
  findAll() {
    return this.prefabService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prefabService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrefabDto: UpdatePrefabDto,
  ) {
    return this.prefabService.update(id, updatePrefabDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prefabService.remove(id);
  }
}
