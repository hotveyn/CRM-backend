import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { $Enums, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class GetOrdersDto {
  @IsEnum($Enums.EnumOrderStatus)
  status?: $Enums.EnumOrderStatus;

  @Transform(({ value }) => {
    if (typeof value === 'string') return +value;
    return value;
  })
  @IsInt()
  offset: number;

  @Transform(({ value }) => {
    if (typeof value === 'string') return +value;
    return value;
  })
  @IsInt()
  limit: number;

  @IsEnum(Prisma.OrderScalarFieldEnum)
  @IsOptional()
  orderBy: string = Prisma.OrderScalarFieldEnum.createdAt;

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  orderDirection: 'asc' | 'desc' = 'desc';
}
