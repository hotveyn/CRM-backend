import { AllowNull, Column, Model, Table } from 'sequelize-typescript';
export interface ICreationReclamationAttrs {
  code: string;
  comment?: string;
}
@Table({ tableName: 'reclamations' })
export class Reclamation extends Model<Reclamation, ICreationReclamationAttrs> {
  @AllowNull(false)
  @Column
  code: string;

  @Column
  comment: string;
}
