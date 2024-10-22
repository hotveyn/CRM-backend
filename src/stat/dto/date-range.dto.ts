import { IsDefined, IsISO8601 } from 'class-validator';

export class DateRangeDto {
  @IsDefined()
  @IsISO8601()
  start: string;

  @IsDefined()
  @IsISO8601()
  end: string;
}
