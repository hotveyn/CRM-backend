import { IPrefabCreationAttrs } from '../entities/prefab.entity';
import { IsNumber, IsString } from 'class-validator';

interface IUpdatePrefabDto extends Partial<IPrefabCreationAttrs> {}

export class UpdatePrefabDto implements IUpdatePrefabDto {
  @IsString()
  code?: string;

  @IsString()
  comment?: string;

  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  type_id?: number;
}
