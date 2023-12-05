import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  isNumber,
} from 'class-validator';

export class CreateProductionPlanDto {
  @IsOptional()
  @IsNumber()
  woodLot: number;

  @IsOptional()
  @IsNumber()
  sparePart: number;
}
