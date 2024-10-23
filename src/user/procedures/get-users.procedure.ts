import { Inject, Injectable } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';
import { GetUsersDto } from '../dto/get-users.dto';

@Injectable()
export class GetUsersProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}

  async execute(payload: GetUsersDto) {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          role: payload.role,
        },
        skip: payload.offset,
        take: payload.limit,
        orderBy: {
          [payload.orderBy]: payload.orderDirection,
        },
      }),
      this.prisma.user.count({
        where: {
          role: payload.role,
        },
      }),
    ]);

    return { data, count };
  }
}
