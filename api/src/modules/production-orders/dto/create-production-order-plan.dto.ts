import { IsNumber, IsOptional } from 'class-validator';

export class CreateProductionOrderPlanDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  sparePart?: number;
}
