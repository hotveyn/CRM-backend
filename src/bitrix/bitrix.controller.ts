import { Body, Controller, Logger, Post } from '@nestjs/common';
import { BitrixService } from './bitrix.service';
import { BitrixImportDto } from './dto/bitrix-import.dto';

@Controller('bitrix')
export class BitrixController {
  private readonly logger = new Logger(BitrixController.name);
  constructor(private readonly bitrixService: BitrixService) {}

  @Post()
  import(@Body() bitrixImportDto: BitrixImportDto) {
    this.logger.log('BITRIX IS TRYING IMPORT SOMETHING SHIET');
    return this.bitrixService.import(bitrixImportDto);
  }
}
