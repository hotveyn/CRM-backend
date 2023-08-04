import { IsDefined, IsString } from 'class-validator';

export class CreateReclamationDto {
  @IsDefined()
  @IsString()
  code: string;

  @IsString()
  comment?: string;
}
