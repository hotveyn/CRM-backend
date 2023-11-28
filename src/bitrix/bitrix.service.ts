import { Injectable } from '@nestjs/common';
import { BitrixImportDto } from './dto/bitrix-import.dto';
import { IBitrixResponse } from './types/IBitrixResponse';
import { OrderService } from '../order/order.service';
import { ImportOrderDto } from '../order/dto/import-order.dto';

@Injectable()
export class BitrixService {
  constructor(readonly orderService: OrderService) {}
  async import(dto: BitrixImportDto) {
    const res = await fetch(
      `https://neonbro.bitrix24.ru/rest/21686/l53sdllzqx9tebg4/crm.deal.get.json?id=${
        dto.document_id[2].split('_')[1]
      }`,
    );
    const data: IBitrixResponse = await res.json();

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
      await this.orderService.import(dto);
    }
  }
}
