import { IsNumber, IsOptional } from 'class-validator';

export class CreateProductionWoodSummaryDto {
  @IsOptional()
  @IsNumber()
  totalWithdraw?: number;
}
