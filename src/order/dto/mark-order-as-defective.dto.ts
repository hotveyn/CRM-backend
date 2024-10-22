import { IsInt } from 'class-validator';

export class MarkOrderAsDefectiveDto {
  @IsInt()
  stageId: number;

  @IsInt()
  breakId: number;
}
