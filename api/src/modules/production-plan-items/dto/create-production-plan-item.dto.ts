import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductionPlanItemDto {
  @IsOptional()
  @IsString()
  name?: string;

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
  @IsBoolean()
  isSuggest?: boolean;
}
