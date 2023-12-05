import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionPlanWoodItemDto } from './create-production-plan-wood-item.dto';

export class UpdateProductionPlanWoodItemDto extends PartialType(CreateProductionPlanWoodItemDto) {}
