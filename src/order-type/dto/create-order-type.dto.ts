import { IsDefined, IsString } from 'class-validator';

export class CreateOrderTypeDto {
  @IsString()
  @IsDefined()
  name: string;
}
