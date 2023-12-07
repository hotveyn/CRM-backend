import { PartialType } from '@nestjs/mapped-types';
import { CreateMonetaryMatrixDto } from './create-monetary-matrix.dto';

export class UpdateMonetaryMatrixDto extends PartialType(
  CreateMonetaryMatrixDto,
) {}
