import { IPrefabCreationAttrs } from '../entities/prefab.entity';
import { IsDefined, IsNumber, IsString } from 'class-validator';

interface ICreatePrefabDtoRequired extends NonNullable<IPrefabCreationAttrs> {}
interface ICreatePrefabDtoOptionally
  extends Omit<IPrefabCreationAttrs, keyof ICreatePrefabDtoRequired> {}

export class CreatePrefabDto
  implements ICreatePrefabDtoRequired, ICreatePrefabDtoOptionally
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
