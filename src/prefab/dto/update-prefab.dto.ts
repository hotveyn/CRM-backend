import { IPrefabCreationAttrs } from '../entities/prefab.entity';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdatePrefabDto
  implements
    Pick<
      IPrefabCreationAttrs,
      'name' | 'code' | 'type_id' | 'comment' | 'price'
    >
{
  @IsString()
  code?: string;

  @IsString()
  comment?: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  price: number;

  @IsDefined()
  @IsNumber()
  type_id: number;
}
