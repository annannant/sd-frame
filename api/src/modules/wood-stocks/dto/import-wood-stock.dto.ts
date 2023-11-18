import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImportWoodStockDto {
  @IsOptional()
  @IsNumber()
  woodId?: number;

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
  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsString()
  locationCode?: string;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  remark?: string;

  @IsOptional()
  @IsBoolean()
  isNewLot?: boolean;
}
