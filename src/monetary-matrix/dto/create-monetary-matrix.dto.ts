import { IsDefined, IsNumber, Min } from 'class-validator';
import { IMonetaryMatrixCreationAttrs } from '../entities/monetary-matrix.entity';

interface ICreateMonetaryMatrixDtoRequired
  extends NonNullable<IMonetaryMatrixCreationAttrs> {}

interface ICreateMonetaryMatrixDtoOptional
  extends Partial<
    Omit<IMonetaryMatrixCreationAttrs, keyof ICreateMonetaryMatrixDtoRequired>
  > {}

export class CreateMonetaryMatrixDto
  implements ICreateMonetaryMatrixDtoOptional
{
  @IsNumber()
  @Min(0)
  @IsDefined()
  percent: number;

  @IsNumber()
  @IsDefined()
  order_type_id: number;

  @IsNumber()
  @IsDefined()
  department_id: number;
}
