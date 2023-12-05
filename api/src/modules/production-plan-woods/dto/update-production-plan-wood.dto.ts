import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionPlanWoodDto } from './create-production-plan-wood.dto';

export class UpdateProductionPlanWoodDto extends PartialType(CreateProductionPlanWoodDto) {}
