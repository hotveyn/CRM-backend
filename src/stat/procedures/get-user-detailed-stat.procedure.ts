import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IExecutable } from '../../interfaces/executable.interface';
import { DateRangeDto } from '../dto/date-range.dto';
import { PrismaServiceToken, TPrismaService } from '../../prisma/prisma.client';
import { $Enums } from '@prisma/client';

@Injectable()
export class GetUserDetailedStatProcedure implements IExecutable {
  constructor(
    @Inject(PrismaServiceToken) private readonly prisma: TPrismaService,
  ) {}

  async execute(id: number, dateRange: DateRangeDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        role: $Enums.EnumUserRole.EMPLOYEE,
      },
      select: {
        lastName: true,
        firstName: true,
        patronymicName: true,
        code: true,
        departments: {
          select: {
            department: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new NotFoundException('Работник не найден');
    const departmentsPayments = await this.prisma.$queryRaw<
      { id: number; name: string; sum: number }[]
    >`
      SELECT d.id as id, d.name as name, trunc(sum(o.price * (os.percent / 100))) as sum
      FROM departments d
      JOIN order_stages os ON os.department_id = d.id
      JOIN orders o ON o.id = os.order_id
      AND os.user_id = ${id}
      AND os.is_active = false
      AND os.ready_date BETWEEN ${dateRange.start}::timestamp AND ${dateRange.end}::timestamp
      GROUP BY d.id, d.name
          `;

    const completedStages = await this.prisma.orderStage.findMany({
      where: {
        userId: id,
        readyDate: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
        isActive: false,
      },
      include: {
        order: {
          select: {
            name: true,
            code: true,
            price: true,
            type: {
              select: {
                name: true,
              },
            },
          },
        },
        department: {
          select: {
            name: true,
          },
        },
        break: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        readyDate: 'desc',
      },
      take: 50,
    });

    return {
      name: user.lastName + ' ' + user.firstName + ' ' + user.patronymicName,
      code: user.code,
      departmentsNames: user.departments.map((d) => d.department.name),
      departmentsPayments,
      completedStages,
    };
  }
}
