import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionWoodSummaryDto } from './create-production-wood-summary.dto';

export class UpdateProductionWoodSummaryDto extends PartialType(CreateProductionWoodSummaryDto) {}
