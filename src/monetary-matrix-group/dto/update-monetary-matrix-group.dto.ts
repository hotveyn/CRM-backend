import { PartialType } from '@nestjs/mapped-types';
import { CreateMonetaryMatrixGroupDto } from './create-monetary-matrix-group.dto';

export class UpdateMonetaryMatrixGroupDto extends PartialType(CreateMonetaryMatrixGroupDto) {}
