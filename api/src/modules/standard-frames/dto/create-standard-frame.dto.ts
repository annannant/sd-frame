import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStandardFrameDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  defaultReorderPoint?: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
