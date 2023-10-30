import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionOrderItemDto } from './create-production-order-item.dto';

export class UpdateProductionOrderItemDto extends PartialType(
  CreateProductionOrderItemDto,
) {}
