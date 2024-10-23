import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { $Enums, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class GetUsersDto {
  @IsEnum($Enums.EnumUserRole)
  role?: $Enums.EnumUserRole;

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

  @IsEnum(Prisma.UserScalarFieldEnum)
  @IsOptional()
  orderBy: string = Prisma.UserScalarFieldEnum.createdAt;

  @IsEnum(['asc', 'desc'])
  @IsOptional()
  orderDirection: 'asc' | 'desc' = 'desc';
}
