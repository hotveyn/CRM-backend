import { IsDateString, IsDefined, IsNumber } from 'class-validator';

export class CreateOrderByPrefabDto {
  @IsNumber()
  prefab_id: number;

  @IsDefined()
  @IsDateString()
  date_start: string;

  @IsDefined()
  @IsDateString()
  date_end: string;
}
