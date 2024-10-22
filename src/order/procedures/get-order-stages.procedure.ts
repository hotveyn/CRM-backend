import { Inject } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';

export class GetOrderStagesProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}
  async execute(orderId: number) {
    return this.prisma.orderStage.findMany({
      where: {
        orderId,
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            patronymicName: true,
          },
        },
      },
    });
  }
}
