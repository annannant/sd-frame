import { IsNumber, IsOptional } from 'class-validator';

export class CreateProductionOrderPlanDto {
  @IsOptional()
  @IsNumber()
  productionOrderId?: number;

  @IsOptional()
  @IsNumber()
  sparePart?: number;
}
