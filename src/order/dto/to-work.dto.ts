import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class ToWorkDto {
  @IsDefined()
  @IsNumber({ allowNaN: false }, { each: true })
  @IsPositive({ each: true })
  departments: number[];
}
