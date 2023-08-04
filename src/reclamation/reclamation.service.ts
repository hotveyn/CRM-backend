import { Injectable } from '@nestjs/common';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reclamation } from './entities/reclamation.model';

@Injectable()
export class ReclamationService {
  constructor(
    @InjectModel(Reclamation)
    private readonly reclamationModel: typeof Reclamation,
  ) {}

  async create(createReclamationDto: CreateReclamationDto) {
    return this.reclamationModel.create(createReclamationDto);
  }
}
