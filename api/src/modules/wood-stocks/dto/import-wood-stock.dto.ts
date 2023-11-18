import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ImportWoodStockDto {
  @IsOptional()
  @IsString()
  woodCode?: string;

  @IsOptional()
  @IsString()
  woodName?: string;

  @IsOptional()
  @IsNumber()
  qty?: number;

  @IsOptional()
  @IsNumber()
  lot?: number;

  @IsOptional()
  @IsString()
  locationCode?: string;

  @IsOptional()
  @IsString()
  locationName?: string;
}
