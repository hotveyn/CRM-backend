import { IsDefined, Min, Max, IsNumber } from 'class-validator';

export class SetRatingDto {
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;
}
