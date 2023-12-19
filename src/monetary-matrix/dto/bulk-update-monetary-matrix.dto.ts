import { IsDefined, IsNumber, Min } from 'class-validator';

export class BulkUpdateMonetaryMatrixDto {
  @IsDefined({ each: true })
  matrices: Matrix[];
}

class Matrix {
  @IsNumber()
  @Min(0)
  percent: number;

  @IsNumber()
  @Min(0)
  order_type_id: number;

  @IsNumber()
  @Min(0)
  department_id: number;
}
