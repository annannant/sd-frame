import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWoodItemStockDto {
  @IsOptional()
  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsNumber()
  lot?: number;

  @IsOptional()
  @IsNumber()
  woodId?: number;

  @IsOptional()
  @IsNumber()
  woodLength?: number;
}
