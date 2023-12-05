import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionPlanSuggestItemDto } from './create-production-plan-suggest-item.dto';

export class UpdateProductionPlanSuggestItemDto extends PartialType(CreateProductionPlanSuggestItemDto) {}
