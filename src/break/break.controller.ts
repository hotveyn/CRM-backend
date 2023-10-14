import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BreakService } from './break.service';
import { CreateBreakDto } from './dto/create-break.dto';
import { UpdateBreakDto } from './dto/update-break.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('break')
export class BreakController {
  constructor(private readonly breakService: BreakService) {}

  @Post()
  create(@Body() createBreakDto: CreateBreakDto) {
    return this.breakService.create(createBreakDto);
  }

  @Get()
  findAll() {
    return this.breakService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.breakService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBreakDto: UpdateBreakDto,
  ) {
    return this.breakService.update(id, updateBreakDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.breakService.remove(id);
  }
}
