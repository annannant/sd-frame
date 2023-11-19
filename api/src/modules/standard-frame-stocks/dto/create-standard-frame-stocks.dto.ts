import { IsNumber, IsOptional } from 'class-validator';

export class CreateStandardFrameStockDto {
  @IsOptional()
  @IsNumber()
  standardFrameId?: number;

  @IsOptional()
  @IsNumber()
  woodId?: number;

  @IsOptional()
  @IsNumber()
  reorderPoint?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;
}
