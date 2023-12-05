import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductionOrderItemDto {
  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  qty?: number;

  @IsOptional()
  @IsBoolean()
  isCustomSize?: boolean;

  @IsOptional()
  @IsNumber()
  productionOrderId?: number;

  @IsOptional()
  @IsNumber()
  standardFrameId?: number;

  @IsOptional()
  @IsString()
  standardFrame?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
