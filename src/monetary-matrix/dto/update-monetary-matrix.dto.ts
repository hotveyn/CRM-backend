import { IsNumber, Min } from 'class-validator';

export class UpdateMonetaryMatrixDto {
  @IsNumber()
  @Min(0)
  percent: number;
}
