import { Controller } from '@nestjs/common';
import { ReclamationService } from './reclamation.service';

@Controller('reclamation')
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}
}
