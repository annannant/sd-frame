import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateWoodTypeDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  length?: number;

  @IsOptional()
  @IsString()
  sizeUnit?: string;

  @IsOptional()
  @IsNumber()
  qtyPerbox?: number;
}
