import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class ToWorkDto {
  @IsDefined({ each: true })
  departments: ToWorkDepartment[];
}

class ToWorkDepartment {
  @IsDefined()
  @IsNumber({ allowNaN: false })
  @IsPositive()
  department_id: number;

  @IsNumber({ allowNaN: false })
  percent: number;
}
