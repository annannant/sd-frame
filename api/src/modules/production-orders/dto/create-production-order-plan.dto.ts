import { IsNumber, IsOptional } from 'class-validator';

export class CreateProductionOrderPlanDto {
  @IsOptional()
  @IsNumber()
  sparePart?: number;
}
