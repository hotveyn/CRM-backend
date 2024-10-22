import { Inject } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';

export class GetOrderStageDepartmentProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}
  async execute(orderStageId: number) {
    const orderStage = await this.prisma.orderStage.findUnique({
      where: {
        id: orderStageId,
      },
      select: {
        department: true,
      },
    });
    return orderStage?.department;
  }
}
