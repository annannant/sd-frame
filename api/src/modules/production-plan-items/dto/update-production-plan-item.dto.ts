import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionPlanItemDto } from './create-production-plan-item.dto';

export class UpdateProductionPlanItemDto extends PartialType(CreateProductionPlanItemDto) {}
