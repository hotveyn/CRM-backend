import { IsDefined } from 'class-validator';

export class CreateDepartmentDto {
  @IsDefined()
  name: string;
}
