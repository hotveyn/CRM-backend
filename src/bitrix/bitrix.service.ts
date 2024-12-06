import { Injectable, Logger } from '@nestjs/common';
import { BitrixImportDto } from './dto/bitrix-import.dto';
import { IBitrixResponse } from './types/IBitrixResponse';
import { OrderService } from '../order/order.service';
import { ImportOrderDto } from '../order/dto/import-order.dto';

@Injectable()
export class BitrixService {
  private readonly logger = new Logger(BitrixService.name);
  constructor(readonly orderService: OrderService) {}

  async import(dto: BitrixImportDto) {
    this.logger.debug('BITRIX SECERT: ' + process.env.BITRIX_SECRET);
    this.logger.debug(
      `Trying to make request to bitrix to https://neonbro.bitrix24.ru/rest/21686/${
        process.env.BITRIX_SECRET
      }/crm.deal.get.json?id=${dto.document_id[2].split('_')[1]}`,
    );

    const res = await fetch(
      `https://neonbro.bitrix24.ru/rest/21686/${
        process.env.BITRIX_SECRET
      }/crm.deal.get.json?id=${dto.document_id[2].split('_')[1]}`,
    );

    const data: IBitrixResponse = await res.json();

    this.logger.debug(`Got response from bitrix: ${JSON.stringify(data)}`);

    if (+data.result.UF_CRM_1656491267678 < 2) {
      const split = data.result.TITLE.split('-').map((str) => {
        return str.trim();
      });
      const title = split.length === 1 ? split[0] : split.slice(1).join(' ');

      const dto = new ImportOrderDto(
        title,
        data.result.BEGINDATE.slice(0, 10),
        data.result.CLOSEDATE.slice(0, 10),
        data.result.ID,
      );

      this.logger.log(JSON.stringify(dto, null, 4));
      await this.orderService.import(dto);
      return;
    }

    for (let i = 1; i <= +data.result.UF_CRM_1656491267678; i++) {
      const split = data.result.TITLE.split('-').map((str) => {
        return str.trim();
      });
      const title = split.length === 1 ? split[0] : split.slice(1).join(' ');
      const dto = new ImportOrderDto(
        title + ' ' + i,
        data.result.BEGINDATE.slice(0, 10),
        data.result.CLOSEDATE.slice(0, 10),
        String(`${data.result.ID}(${i})`),
      );

      this.logger.log(JSON.stringify(dto, null, 4));
      await this.orderService.import(dto);
    }
  }
}
