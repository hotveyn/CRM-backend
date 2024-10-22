import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';
import { MarkOrderAsDefectiveDto } from '../dto/mark-order-as-defective.dto';
import { $Enums } from '@prisma/client';

@Injectable()
export class MarkOrderAsBreakProcedure {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}

  async execute(id: number, payload: MarkOrderAsDefectiveDto) {
    const orderToMark = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!orderToMark)
      throw new NotFoundException('Not found order to mark defective');

    const orderStageToMark = await this.prisma.orderStage.findUnique({
      where: {
        id: payload.stageId,
      },
    });

    if (!orderStageToMark)
      throw new NotFoundException('Not found order stage to mark defective');

    if (orderStageToMark.orderId !== orderToMark.id)
      throw new NotFoundException('Order stage does not belong to this order');

    const markBreak = await this.prisma.break.findUnique({
      where: {
        id: payload.breakId,
      },
    });

    if (markBreak.departmentId !== orderStageToMark.departmentId)
      throw new NotFoundException(
        'Break does not belong to this department of order stage',
      );

    await this.prisma.$transaction([
      this.prisma.orderStage.update({
        where: {
          id: orderStageToMark.id,
        },
        data: {
          breakId: markBreak.id,
        },
      }),
      this.prisma.order.create({
        data: {
          name: orderToMark.name,
          dateStart: orderToMark.dateStart,
          dateEnd: orderToMark.dateEnd,
          neonLength: orderToMark.neonLength,
          status: $Enums.EnumOrderStatus.NEW,
          reclamationNumber: crypto.randomUUID(),
          code: orderToMark.code + 'R',
          price: orderToMark.price,
        },
      }),
    ]);
  }
}
