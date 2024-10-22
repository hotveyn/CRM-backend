import { Inject, Injectable } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';

@Injectable()
export class GetOrdersProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}

  async execute(payload: GetOrdersDto) {
    console.log(payload);
    const [data, count] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: {
          status: payload.status,
        },
        skip: payload.offset,
        take: payload.limit,
        orderBy: {
          [payload.orderBy]: payload.orderDirection,
        },
        include: {
          type: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.order.count({
        where: {
          status: payload.status,
        },
      }),
    ]);

    return { data, count };
  }
}
