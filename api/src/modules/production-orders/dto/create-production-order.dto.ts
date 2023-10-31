import { Type } from 'class-transformer';

import { CreateProductionOrderItemDto } from '@/modules/production-order-items/dto/create-production-order-item.dto';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductionOrderDto {
  @IsOptional()
  @IsNumber()
  woodId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @Type(() => CreateProductionOrderItemDto)
  @IsOptional()
  @IsArray()
  @ValidateNested()
  orderItems?: CreateProductionOrderItemDto[];
}
