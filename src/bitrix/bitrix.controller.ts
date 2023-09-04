import { Body, Controller, Post } from '@nestjs/common';
import { BitrixService } from './bitrix.service';
import { BitrixImportDto } from './dto/bitrix-import.dto';

@Controller('bitrix')
export class BitrixController {
  constructor(private readonly bitrixService: BitrixService) {}

  @Post()
  import(@Body() bitrixImportDto: BitrixImportDto) {
    return this.bitrixService.import(bitrixImportDto);
  }
}
