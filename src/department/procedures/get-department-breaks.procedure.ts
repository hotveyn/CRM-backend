import { Inject } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';

export class GetDepartmentBreaksProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}
  async execute(departmentId: number) {
    return await this.prisma.break.findMany({
      where: {
        departmentId,
      },
    });
  }
}
