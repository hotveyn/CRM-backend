import { IsDefined, IsString } from 'class-validator';

export class UpdateOrderTypeDto {
  @IsString()
  @IsDefined()
  name: string;
}
